package com.speproject.admin_service.mapper;

import com.speproject.admin_service.dto.PatientRequest;
import com.speproject.admin_service.entity.Patient;
import org.springframework.stereotype.Service;

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
