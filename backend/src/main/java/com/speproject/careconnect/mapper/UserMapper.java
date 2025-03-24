package com.speproject.careconnect.mapper;

import com.speproject.careconnect.dto.AuthRequest;

import com.speproject.careconnect.entity.User;
import org.springframework.stereotype.Service;

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
