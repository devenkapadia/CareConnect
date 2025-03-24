package com.speproject.careconnect.service;

import com.speproject.careconnect.dto.AuthRequest;
import com.speproject.careconnect.entity.User;
import com.speproject.careconnect.exception.CustomException;
import com.speproject.careconnect.helper.EncryptionService;
import com.speproject.careconnect.helper.JWTHelper;
import com.speproject.careconnect.mapper.UserMapper;
import com.speproject.careconnect.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final EncryptionService encryptionService;
    private final JWTHelper jwHelper;
    private final UserRepo repo;
    private final UserMapper mapper;

    public User registerUser(AuthRequest.UserRegisterRequest request, String role) {
        User user = mapper.toEntity(request);
        Optional<User> existingUser = repo.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new CustomException.BadRequest("User already exists");
        }
        user.setRole(role);
        user.setPassword(encryptionService.encode(user.getPassword()));
        user = repo.save(user);
        return user;
    }

    public String loginUser(AuthRequest.UserLoginRequest  request) {
        User user = repo.findByEmail(request.email()).orElse(null);
        if (user == null) {
            throw new CustomException.UnauthorizedException("Invalid Username or Password!");
        }
        if (encryptionService.validates(request.password(), user.getPassword())) {
            return jwHelper.generateToken(user.getId(),user.getName(),user.getEmail(),user.getRole());
        } else {
            throw new CustomException.UnauthorizedException("Invalid Username or Password!");
        }
    }

}
