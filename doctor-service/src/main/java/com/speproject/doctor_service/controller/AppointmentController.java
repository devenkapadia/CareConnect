package com.speproject.doctor_service.controller;

import com.speproject.doctor_service.dto.*;
import com.speproject.doctor_service.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/doctor/appointment")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<List<AppointmentResponse.AppointmentDetails>> getAppointments(@AuthenticationPrincipal String id) {
        List<AppointmentResponse.AppointmentDetails> appointments = appointmentService.getAllAppointments(id);
        return ResponseEntity.ok(appointments);
    }
}
