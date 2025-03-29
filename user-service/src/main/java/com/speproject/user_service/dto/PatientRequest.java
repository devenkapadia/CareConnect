package com.speproject.user_service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.speproject.user_service.entity.Patient.GenderType;
import jakarta.validation.constraints.*;

import java.util.Date;
import java.util.UUID;

public class PatientRequest{
        public record AddRequest(
                @NotNull(message = "First name is required")
                @NotBlank(message = "First name cannot be blank")
                @Size(max = 100, message = "First name should not exceed 100 characters")
                @JsonProperty("first_name")
                String first_name,

                @NotNull(message = "Last name is required")
                @NotBlank(message = "Last name cannot be blank")
                @Size(max = 100, message = "Last name should not exceed 100 characters")
                @JsonProperty("last_name")
                String last_name,

                @Past(message = "Date of birth must be in the past")
                @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy") // Ensure JSON date format
                @JsonProperty("date_of_birth")
                Date date_of_birth, // Use `String` if receiving as "yyyy-MM-dd", otherwise `LocalDate`

                @NotNull(message = "Gender is required")
                @JsonProperty("gender")
                GenderType gender
        ) {
        }
}
