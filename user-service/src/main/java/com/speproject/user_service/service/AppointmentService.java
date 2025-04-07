package com.speproject.user_service.service;

import com.speproject.user_service.dto.*;
import com.speproject.user_service.entity.*;
import com.speproject.user_service.exception.CustomException;
import com.speproject.user_service.mapper.AppointmentMapper;
import com.speproject.user_service.mapper.PatientMapper;
import com.speproject.user_service.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepo repo;
    private final UserRepo userRepo;
    private final PatientRepo patientRepo;
    private final DoctorRepo doctorRepo;
    private final AppointmentMapper mapper;
    private final ArchivedAppointmentRepo archivedAppointmentRepo;

    public Map<String,List<AppointmentResponse.AppointmentDetails>> makeAppointment(AppointmentRequest.AddRequest request, String id) {
        Appointment appointment = mapper.toEntity(request,id);
        if(!id.equals(appointment.getUser().getId().toString())) {
            throw new CustomException.UnauthorizedException("User is not authorized to make appointment");
        }
        Optional<List<Appointment>> currentApp = repo.findByDoctor_IdAndDateAndTime(appointment.getDoctor().getId(), appointment.getDate(), appointment.getTime());
        if(currentApp.isPresent()) {
            for(Appointment app : currentApp.get()) {
                if(app.getStatus()== Appointment.AppointmentStatus.PENDING){
                    throw new CustomException.BadRequest("Appointment slot is already booked");
                }
            }
        }
        Optional<User> user = userRepo.findById(appointment.getUser().getId());
        Optional<Patient> patient = patientRepo.findById(appointment.getPatient().getPatient_id());
        Optional<Doctor> doctor = doctorRepo.findById(appointment.getDoctor().getId());
        if(user.isEmpty()) {
            throw new CustomException.NotFound("User not found");
        }
        if(patient.isEmpty()) {
            throw new CustomException.NotFound("Patient not found");
        }
        if(doctor.isEmpty()) {
            throw new CustomException.NotFound("Doctor not found");
        }
        appointment.setPatient(patient.get());
        appointment.setDoctor(doctor.get());
        appointment.setUser(user.get());
        repo.save(appointment);
        return getAllAppointments(id);
    }

    public Map<String,List<AppointmentResponse.AppointmentDetails>> getAllAppointments(String id) {
        Map<String,List<AppointmentResponse.AppointmentDetails>> output = new HashMap<>();
        Optional<List<Appointment>> appointments = repo.findByUser_Id(UUID.fromString(id));
        if(appointments.isEmpty()) {
            return output;
        }
        List<AppointmentResponse.AppointmentDetails> pending = new ArrayList<>();
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
            pending.add(data);
        }

        output.put("pending_appointments", pending);
        Optional<List<ArchivedAppointment>> archivedAppointments = archivedAppointmentRepo.findByUser_Id(UUID.fromString(id));
        if(archivedAppointments.isEmpty()) {
            return output;
        }
        List<AppointmentResponse.AppointmentDetails> old = new ArrayList<>();
        for(ArchivedAppointment appointment : archivedAppointments.get()) {
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
            old.add(data);
        }
        output.put("completed_appointments", old);
        return output;
    }



}
