package com.speproject.auth_service.mapper;

import com.speproject.auth_service.dto.AuthRequest;

import com.speproject.auth_service.entity.User;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserMapper {
    public User toEntity(AuthRequest.UserRegisterRequest request) {
        return User.builder()
                .name(request.name())
                .email(request.email())
                .password(request.password())
                .role("")
                .build();
    }
}
