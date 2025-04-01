package com.speproject.doctor_service.controller;

import com.speproject.doctor_service.dto.*;
import com.speproject.doctor_service.entity.Appointment;
import com.speproject.doctor_service.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/doctor/appointment")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<Map<String,List<AppointmentResponse.AppointmentDetails>>> getAppointments(@AuthenticationPrincipal String id) {
        Map<String,List<AppointmentResponse.AppointmentDetails>> appointments = appointmentService.getAllAppointments(id);
        return ResponseEntity.ok(appointments);
    }

    @PatchMapping("/{appid}")
    public ResponseEntity<Map<String,List<AppointmentResponse.AppointmentDetails>>> approveAppointment(@AuthenticationPrincipal String id,@PathVariable String appid){
        Map<String,List<AppointmentResponse.AppointmentDetails>> appointments = appointmentService.updateAppointment(id,appid,Appointment.AppointmentStatus.CONFIRMED);
        return ResponseEntity.ok(appointments);
    }

    @PatchMapping("/reject/{appid}")
    public ResponseEntity<Map<String, List<AppointmentResponse.AppointmentDetails>>> rejectAppointment(@AuthenticationPrincipal String id, @PathVariable String appid) {
        Map<String, List<AppointmentResponse.AppointmentDetails>> appointments = appointmentService.updateAppointment(id, appid, Appointment.AppointmentStatus.CANCELLED);
        return ResponseEntity.ok(appointments);
    }

}
