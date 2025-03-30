package com.speproject.admin_service.dto;

import com.speproject.admin_service.entity.Doctor;
import com.speproject.admin_service.entity.User;
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
        private String degree;
        private String address;

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
                    .degree(doctor.getDegree())
                    .address(doctor.getAddress())
                    .build();
        }
    }
    public record AppointmentDetails(
        UUID appointment_id,
        String date,
        String time,
        String status
    ){

    }
    public record CompleteDetails(
            UUID doctor_id,
            String name,
            String specialization,
            Integer years_of_experience,
            BigDecimal consultation_fee,
            String about,
            String image,
            String degree,
            String address,
            Map<String, List<String>> slots_available,
            Map<String,List<AppointmentResponse.AppointmentDetails>> appointments
    ) {
        // You can add additional methods if needed
    }
}