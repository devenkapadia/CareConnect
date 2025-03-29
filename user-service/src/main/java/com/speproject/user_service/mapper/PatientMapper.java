package com.speproject.user_service.mapper;

import com.speproject.user_service.dto.PatientRequest;
import com.speproject.user_service.dto.PublicRequest;
import com.speproject.user_service.entity.Patient;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class PatientMapper {

    public Patient toEntity(PatientRequest.AddRequest request) {
        return Patient.builder()
                .first_name(request.first_name())
                .last_name(request.last_name())
                .gender(request.gender())
                .date_of_birth(request.date_of_birth())
                .build();
    }
}
