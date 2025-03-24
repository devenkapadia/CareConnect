package com.speproject.careconnect.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

public class AuthResponse {
    public record UserLoginToken(
            String token
    ) {
    }
}