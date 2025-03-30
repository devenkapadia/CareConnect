package com.speproject.doctor_service.controller;

import com.speproject.doctor_service.dto.DoctorResponse;
import com.speproject.doctor_service.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/doctor")
public class DoctorController {
    private final DoctorService doctorService;
    @GetMapping
    public ResponseEntity<DoctorResponse.CompleteDetails> getDoctorById(@AuthenticationPrincipal String id) {
        DoctorResponse.CompleteDetails doctor = doctorService.getDoctorById(id);
        return ResponseEntity.ok(doctor);
    }
}
