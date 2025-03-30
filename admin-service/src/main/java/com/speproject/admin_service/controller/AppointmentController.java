package com.speproject.admin_service.controller;

import com.speproject.admin_service.dto.*;
import com.speproject.admin_service.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/admin/appointment")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<Map<String,List<AppointmentResponse.AppointmentDetails>>> getAppointments() {
        Map<String,List<AppointmentResponse.AppointmentDetails>> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

}
