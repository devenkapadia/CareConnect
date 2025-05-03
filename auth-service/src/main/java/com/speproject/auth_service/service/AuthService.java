package com.speproject.auth_service.service;

import com.speproject.auth_service.dto.AuthRequest;
import com.speproject.auth_service.entity.User;
import com.speproject.auth_service.exception.CustomException;
import com.speproject.auth_service.helper.EncryptionService;
import com.speproject.auth_service.helper.JWTHelper;
import com.speproject.auth_service.mapper.UserMapper;
import com.speproject.auth_service.repo.UserRepo;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.speproject.auth_service.service.RabbitMQProducer;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final EncryptionService encryptionService;
    private final JWTHelper jwHelper;
    private final UserRepo repo;
    private final UserMapper mapper;
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    @Autowired
    private RabbitMQProducer producer;
    public User registerUser(AuthRequest.UserRegisterRequest request, String role) {
        User user = mapper.toEntity(request);
        Optional<User> existingUser = repo.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new CustomException.BadRequest("User already exists");
        }
        user.setRole(role);
        user.setPassword(encryptionService.encode(user.getPassword()));
        user = repo.save(user);
        log.info(role + " registered successfully: " + user.getName());
        return user;
    }

    public String loginUser(AuthRequest.UserLoginRequest  request) {
        User user = repo.findByEmail(request.email()).orElse(null);
        if (user == null) {
            throw new CustomException.UnauthorizedException("Invalid Username or Password!");
        }
        if (encryptionService.validates(request.password(), user.getPassword())) {
            // Send user data to RabbitMQ
            Map<String, String> map = new HashMap<>();
            map.put("email", user.getEmail());
            map.put("subject", "Login Notification");
            map.put("message", "User " + user.getName() + " logged in successfully.");
            log.info("Email Sent", user.getEmail());
            producer.sendMessage(map.toString());
            return jwHelper.generateToken(user.getUser_id(),user.getName(),user.getEmail(),user.getRole());
        } else {
            throw new CustomException.UnauthorizedException("Invalid Username or Password!");
        }
    }
}
