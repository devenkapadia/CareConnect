package com.speproject.user_service.mapper;

import com.speproject.user_service.dto.AppointmentRequest;
import com.speproject.user_service.dto.PublicRequest;
import com.speproject.user_service.entity.*;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AppointmentMapper {
    public Appointment toEntity(AppointmentRequest.AddRequest request,String id) {
        Patient patient = new Patient();
        User user = new User();
        Doctor doctor = new Doctor();
        patient.setPatient_id(UUID.fromString(request.patientId()));
        user.setId(UUID.fromString(id));
        doctor.setId(UUID.fromString(request.doctorId()));
        return Appointment.builder()
                .date(request.date())
                .time(request.time())
                .patient(patient)
                .user(user)
                .doctor(doctor)
                .status(Appointment.AppointmentStatus.REQUESTED)
                .notes(request.notes())
                .build();
    }
}
