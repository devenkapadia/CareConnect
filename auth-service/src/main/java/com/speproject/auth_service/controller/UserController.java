package com.speproject.auth_service.controller;
import com.speproject.auth_service.entity.User;
import com.speproject.auth_service.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/fetchByEmail")
    public ResponseEntity<User> fetchByEmail() {
        String email = "admin@admin.com";
        User user = userService.findByEmail(email);
        return ResponseEntity.ok(user);
    }
}
