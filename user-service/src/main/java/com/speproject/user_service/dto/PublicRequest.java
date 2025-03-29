package com.speproject.user_service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

public class PublicRequest {
    public record FeedbackRequest(
            @NotNull(message = "Name should be present")
            @NotEmpty(message = "Name should be present")
            @NotBlank(message = "Name should be present")
            @Size(max = 100, message = "Name should not exceed 100 characters")
            @JsonProperty("name")
            String name,

            @NotNull(message = "Email is required")
            @NotEmpty(message = "Email is required")
            @Email(message = "Email must be in a correct format")
            @Size(max = 255, message = "Email should not exceed 255 characters")
            @JsonProperty("email")
            String email,

            @NotNull(message = "Comments cannot be empty")
            @NotEmpty(message = "Comments cannot be empty")
            @NotBlank(message = "Comments cannot be empty")
            @Size(max = 500, message = "Comments should not exceed 500 characters")
            @JsonProperty("comments")
            String comments
    ) {
    }
}
