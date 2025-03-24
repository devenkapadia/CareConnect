package com.speproject.careconnect.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

public class AuthRequest {
    public record UserRegisterRequest(
            @NotNull(message = "Name should be present")
            @NotEmpty(message = "Name should be present")
            @NotBlank(message = "Name should be present")
            @JsonProperty("name")
            String name,

            @NotNull(message = "Employee email is required")
            @Email(message = "Email must be in correct format")
            @JsonProperty("email")
            String email,

            @NotNull(message = "The password should have a minimum length of 8 characters")
            @NotEmpty(message = "The password should have a minimum length of 8 characters")
            @NotBlank(message = "The password should have a minimum length of 8 characters")
            @Size(min = 8, max = 25)
            @JsonProperty("password")
            String password
    ) {
    }
    public record UserLoginRequest(
            @NotNull(message = "Email is required")
            @Email(message = "Email must be in correct format")
            @JsonProperty("email")
            String email,

            @NotNull(message = "The password should have a minimum length of 8 characters")
            @NotEmpty(message = "The password should have a minimum length of 8 characters")
            @NotBlank(message = "The password should have a minimum length of 8 characters")
            @Size(min = 8, max = 25)
            @JsonProperty("password")
            String password
    ) {
    }
}
