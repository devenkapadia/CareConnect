package com.speproject.user_service.controller;

import com.speproject.user_service.dto.DoctorResponse;
import com.speproject.user_service.dto.PatientRequest;
import com.speproject.user_service.dto.PatientResponse;
import com.speproject.user_service.service.DoctorService;
import com.speproject.user_service.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user/doctor")
public class DoctorController {
    private final DoctorService doctorService;

    @GetMapping
    public ResponseEntity<Map<String, List<DoctorResponse.BasicDetails>>> getDoctors(@AuthenticationPrincipal String id) {
        Map<String, List<DoctorResponse.BasicDetails>> doctors = doctorService.getALlDoctors(id);
        return ResponseEntity.ok(doctors);
    }
/*
    @GetMapping("/{reqid}")
    public ResponseEntity<DoctorResponse.CompleteDetails> getDoctorById(@AuthenticationPrincipal String id, @PathVariable String reqid) {
        DoctorResponse doctor = doctorService.getDoctorById(id,reqid);
        return ResponseEntity.ok(doctor);
    }

 */
}
