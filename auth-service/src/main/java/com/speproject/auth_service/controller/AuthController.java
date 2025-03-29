package com.speproject.auth_service.controller;

import com.speproject.auth_service.dto.AuthRequest;
import com.speproject.auth_service.dto.AuthResponse;
import com.speproject.auth_service.entity.User;
import com.speproject.auth_service.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/registerDoctor")
    public ResponseEntity<String> registerDoctor(@RequestBody @Valid AuthRequest.UserRegisterRequest registerRequest) {
        User user = authService.registerUser(registerRequest,"DOCTOR");
        return ResponseEntity.ok("Doctor "+ user.getName() +" registered successfully!");
    }

    @PostMapping("/registerPatient")
    public ResponseEntity<String> registerPatient(@RequestBody @Valid AuthRequest.UserRegisterRequest registerRequest) {
        User user = authService.registerUser(registerRequest,"PATIENT");
        return ResponseEntity.ok("Patient "+ user.getName() +" registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse.UserLoginToken> loginUser(@RequestBody @Valid AuthRequest.UserLoginRequest loginRequest) {
        String login_status = authService.loginUser(loginRequest);
        return ResponseEntity.ok(new AuthResponse.UserLoginToken(login_status));
    }
}
