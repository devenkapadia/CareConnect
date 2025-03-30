package com.speproject.doctor_service.dto;

import com.speproject.doctor_service.entity.Patient;
import com.speproject.doctor_service.entity.User;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
public class PatientResponse {
    private UUID patient_id;
    private String first_name;
    private String last_name;
    private Date date_of_birth;
    private String gender;

    public static PatientResponse fromEntity(Patient patient) {
        User user = patient.getUser();
        return PatientResponse.builder()
                .patient_id(patient.getPatient_id())
                .first_name(patient.getFirst_name())
                .last_name(patient.getLast_name())
                .date_of_birth(patient.getDate_of_birth())
                .gender(patient.getGender().name())
                .build();
    }
}
