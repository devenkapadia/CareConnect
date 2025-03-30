package com.speproject.admin_service.mapper;

import com.speproject.admin_service.dto.AppointmentRequest;
import com.speproject.admin_service.dto.DoctorRequest;
import com.speproject.admin_service.entity.*;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DoctorMapper {
    public Doctor toEntity(DoctorRequest.AddRequest request, String id) {
        return Doctor.builder()
                .specialization(request.specialization())
                .started_year(request.startedYear())
                .consultation_fee(request.consultationFee())
                .about(request.about())
                .degree(request.degree())
                .address(request.address())
                .image(request.image())
                .build();
    }
}
