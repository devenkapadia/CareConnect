package com.speproject.doctor_service.service;

import com.speproject.doctor_service.dto.*;
import com.speproject.doctor_service.entity.Appointment;
import com.speproject.doctor_service.entity.Doctor;
import com.speproject.doctor_service.entity.Patient;
import com.speproject.doctor_service.entity.User;
import com.speproject.doctor_service.exception.CustomException;
import com.speproject.doctor_service.mapper.AppointmentMapper;
import com.speproject.doctor_service.repo.AppointmentRepo;
import com.speproject.doctor_service.repo.DoctorRepo;
import com.speproject.doctor_service.repo.PatientRepo;
import com.speproject.doctor_service.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepo repo;
    private final UserRepo userRepo;
    private final PatientRepo patientRepo;
    private final DoctorRepo doctorRepo;
    private final AppointmentMapper mapper;


    public List<AppointmentResponse.AppointmentDetails> getAllAppointments(String id) {
        Optional<List<Appointment>> appointments = repo.findByDoctor_Id(UUID.fromString(id));
        if(appointments.isEmpty()) {
            return new ArrayList<>();
        }
        List<AppointmentResponse.AppointmentDetails> output = new ArrayList<>();
        for(Appointment appointment : appointments.get()) {
            DoctorResponse.BasicDetails doctor = DoctorResponse.BasicDetails.fromEntity(appointment.getDoctor());
            PatientResponse patient = PatientResponse.fromEntity(appointment.getPatient());
            AppointmentResponse.AppointmentDetails data = new AppointmentResponse.AppointmentDetails(
                appointment.getAppointment_id(),
                doctor,
                patient,
                appointment.getDate(),
                appointment.getTime(),
                appointment.getStatus().toString()
            );
            output.add(data);
        }
        return output;
    }



}
