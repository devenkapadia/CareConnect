package com.speproject.admin_service.controller;

import com.speproject.admin_service.dto.DoctorRequest;
import com.speproject.admin_service.dto.DoctorResponse;
import com.speproject.admin_service.service.DoctorService;
import com.speproject.admin_service.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/admin/doctor")
public class DoctorController {
    private final DoctorService doctorService;
    private static final Logger log = LoggerFactory.getLogger(DoctorController.class);
    @GetMapping
    public ResponseEntity<Map<String, List<DoctorResponse.BasicDetails>>> getDoctors() {
        Map<String, List<DoctorResponse.BasicDetails>> doctors = doctorService.getALlDoctors();
        log.info("Fetched all doctors successfully");
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/{docid}")
    public ResponseEntity<DoctorResponse.CompleteDetails> getDoctorById(@PathVariable String docid) {
        DoctorResponse.CompleteDetails doctor = doctorService.getDoctorById(docid);
        log.info("Fetched doctor with ID: " + docid);
        return ResponseEntity.ok(doctor);
    }

    @DeleteMapping("/{docid}")
    public ResponseEntity<String> deleteDoctor(@PathVariable String docid) {
        doctorService.deleteDoctor(docid);
        log.info("Deleted doctor with ID: " + docid);
        return ResponseEntity.ok("success");
    }

    @PostMapping
    public ResponseEntity<DoctorResponse.CompleteDetails> createDoctor(@RequestBody DoctorRequest.AddRequest doctorRequest) {
        User user = doctorService.registerUser(doctorRequest);
        DoctorResponse.CompleteDetails newDoc = doctorService.createDoctor(doctorRequest,user.getId().toString());
        log.info("Doctor created successfully: " + doctorRequest.email());
        return ResponseEntity.ok(newDoc);
    }

}
