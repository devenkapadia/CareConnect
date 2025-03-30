package com.speproject.admin_service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class AppointmentRequest {
        public record AddRequest(
                @NotNull(message = "Patient ID is required")
                @JsonProperty("patient_id")
                String patientId,

                @NotNull(message = "Doctor ID is required")
                @JsonProperty("doctor_id")
                String doctorId,

                @NotNull(message = "Appointment date is required")
                @JsonProperty("date")
                @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy") // Format for date
                String date,

                @NotNull(message = "Appointment time is required")
                @JsonProperty("time")
                @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm") // Format for time
                String time,

                @Size(max = 500, message = "Notes should not exceed 500 characters")
                @JsonProperty("notes")
                String notes
        ) {
        }

}