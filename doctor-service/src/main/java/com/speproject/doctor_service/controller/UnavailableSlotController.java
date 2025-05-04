package com.speproject.doctor_service.controller;

import com.speproject.doctor_service.dto.UnavailableSlotRequestDTO;
import com.speproject.doctor_service.entity.UnavailableSlot;
import com.speproject.doctor_service.service.UnavailableSlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/doctor")
@RequiredArgsConstructor
public class UnavailableSlotController {

    private final UnavailableSlotService slotService;

    @PostMapping("/unavailable")
    public ResponseEntity<String> addUnavailableSlots(
            @AuthenticationPrincipal String doctorId,  // Extracted from token
            @RequestBody UnavailableSlotRequestDTO dto
    ) {
        try {
            slotService.saveUnavailableSlots(UUID.fromString(doctorId), dto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Unavailable slots successfully added.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error adding unavailable slots: " + e.getMessage());
        }
    }

    @GetMapping("/unavailable")
    public List<UnavailableSlot> getUnavailableSlots(
            @AuthenticationPrincipal String doctorId,  // Extracted from token
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ) {
        if (start == null) {
            start = LocalDate.now();
        }
        if (end == null) {
            end = start.plusWeeks(1);
        }

            return slotService.getUnavailableSlots(UUID.fromString(doctorId), start, end);
    }
}
