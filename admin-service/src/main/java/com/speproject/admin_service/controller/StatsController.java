package com.speproject.admin_service.controller;

import com.speproject.admin_service.dto.DoctorResponse;
import com.speproject.admin_service.service.DoctorService;
import com.speproject.admin_service.service.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/admin/stats")
public class StatsController {
    private final StatsService statsService;
    private static final Logger log = LoggerFactory.getLogger(StatsController.class);
    @GetMapping
    public ResponseEntity<Map<String, Long>> getStats() {
        Map<String, Long> stats = statsService.getStats();
        log.info("Fetched stats successfully");
        return ResponseEntity.ok(stats);
    }
}
