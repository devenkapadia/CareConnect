package com.speproject.user_service.controller;

import com.speproject.user_service.dto.*;
import com.speproject.user_service.service.AppointmentService;
import com.speproject.user_service.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user/appointment")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<Map<String,List<AppointmentResponse.AppointmentDetails>>> makeAppointment(@AuthenticationPrincipal String id, @RequestBody @Valid AppointmentRequest.AddRequest addRequest) {
        Map<String,List<AppointmentResponse.AppointmentDetails>> appointments = appointmentService.makeAppointment(addRequest,id);
        return ResponseEntity.ok(appointments);
    }
    @GetMapping
    public ResponseEntity<Map<String,List<AppointmentResponse.AppointmentDetails>>> getAppointments(@AuthenticationPrincipal String id) {
        Map<String,List<AppointmentResponse.AppointmentDetails>> appointments = appointmentService.getAllAppointments(id);
        return ResponseEntity.ok(appointments);
    }
}
