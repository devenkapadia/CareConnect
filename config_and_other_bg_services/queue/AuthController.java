package com.speproject.auth_service.controller;

import com.speproject.auth_service.dto.AuthRequest;
import com.speproject.auth_service.dto.AuthResponse;
import com.speproject.auth_service.entity.User;
import com.speproject.auth_service.service.AuthService;
import com.speproject.auth_service.service.RabbitMQProducer;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    private RabbitMQProducer producer;

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
    @GetMapping
    public ResponseEntity<String> dummy(){
        log.info("Auth called: {}", 1234);
        Map<String,String> map = new HashMap<>();
        map.put("email","shubhp2610@gmail.com");
        map.put("subject","hello");
        map.put("message","success");
        producer.sendMessage(map.toString());
        return ResponseEntity.ok("dummy");
    }
}
