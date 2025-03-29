package com.speproject.user_service.dto;

import com.speproject.user_service.entity.Appointment;
import com.speproject.user_service.entity.User;
import com.speproject.user_service.entity.Doctor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
public class DoctorResponse {

    private DoctorResponse doctorResponse;
    private CompleteDetails completeDetails;

    @Data
    @Builder
    public static class BasicDetails {
        private UUID doctor_id;
        private String name;
        private String specialization;
        private Integer years_of_experience;
        private BigDecimal consultation_fee;
        private String about;
        private String image;

        public static BasicDetails fromEntity(Doctor doctor) {
            User user = doctor.getUser ();
            int currentYear = new Date().getYear() + 1900; // getYear() returns year since 1900
            int yearsOfExperience = currentYear - doctor.getStarted_year();

            return BasicDetails.builder()
                    .doctor_id(doctor.getId())
                    .name(user.getName())
                    .specialization(doctor.getSpecialization())
                    .years_of_experience(yearsOfExperience)
                    .consultation_fee(doctor.getConsultation_fee())
                    .about(doctor.getAbout())
                    .image(doctor.getImage())
                    .build();
        }
    }
    public record AppointmentDetails(
        UUID appointment_id,
        String date,
        String time
    ){

    }
    public record CompleteDetails(
            UUID doctorId,
            String name,
            String specialization,
            Integer yearsOfExperience,
            BigDecimal consultationFee,
            String about,
            String image,
            Map<String, List<String>> slotsAvailable,
            List<AppointmentDetails> appointments
    ) {
        // You can add additional methods if needed
    }
}