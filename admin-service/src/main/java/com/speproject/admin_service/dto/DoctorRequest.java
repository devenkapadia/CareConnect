package com.speproject.admin_service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.UUID;

public class DoctorRequest {
    public record AddRequest(
            @NotNull(message = "Name should be present")
            @NotEmpty(message = "Name should be present")
            @NotBlank(message = "Name should be present")
            @JsonProperty("name")
            String name,

            @NotNull(message = "Email is required")
            @Email(message = "Email must be in correct format")
            @JsonProperty("email")
            String email,

            @NotNull(message = "The password should have a minimum length of 8 characters")
            @NotEmpty(message = "The password should have a minimum length of 8 characters")
            @NotBlank(message = "The password should have a minimum length of 8 characters")
            @Size(min = 8, max = 25)
            @JsonProperty("password")
            String password,

            @NotNull(message = "Specialization is required")
            @JsonProperty("specialization")
            @Size(max = 100, message = "Specialization should not exceed 100 characters")
            String specialization,

            @NotNull(message = "Started year is required")
            @JsonProperty("started_year")
            Integer startedYear,

            @NotNull(message = "Consultation fee is required")
            @JsonProperty("consultation_fee")
            BigDecimal consultationFee,

            @JsonProperty("about")
            @Size(max = 1000, message = "About section should not exceed 1000 characters")
            String about,

            @JsonProperty("image")
            String image,

            @JsonProperty("degree")
            String degree,

            @JsonProperty("address")
            String address
    ) {
    }
}
