package com.speproject.user_service.controller;

import com.speproject.user_service.dto.PatientRequest;
import com.speproject.user_service.dto.PatientResponse;
import com.speproject.user_service.entity.Patient;
import com.speproject.user_service.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user/patient")
public class PatientController {
    private final PatientService patientService;

    @PostMapping
    public ResponseEntity<List<PatientResponse>> addPatient(@AuthenticationPrincipal String id, @RequestBody @Valid PatientRequest.AddRequest addRequest) {
        List<PatientResponse> patients = patientService.addPatient(addRequest,id);
        return ResponseEntity.ok(patients);
    }
    @GetMapping
    public ResponseEntity<List<PatientResponse>> getPatient(@AuthenticationPrincipal String id) {
        List<PatientResponse> patients = patientService.getALlPatient(id);
        return ResponseEntity.ok(patients);
    }
}
