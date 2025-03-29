package com.speproject.auth_service.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

public class AuthResponse {
    public record UserLoginToken(
            String token
    ) {
    }
}