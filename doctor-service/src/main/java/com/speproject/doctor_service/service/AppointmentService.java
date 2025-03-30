package com.speproject.doctor_service.service;

import com.speproject.doctor_service.dto.*;
import com.speproject.doctor_service.entity.*;
import com.speproject.doctor_service.exception.CustomException;
import com.speproject.doctor_service.mapper.AppointmentMapper;
import com.speproject.doctor_service.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepo repo;
    private final UserRepo userRepo;
    private final PatientRepo patientRepo;
    private final DoctorRepo doctorRepo;
    private final AppointmentMapper mapper;
    private final ArchivedAppointmentRepo archivedAppointmentRepo;


    public Map<String,List<AppointmentResponse.AppointmentDetails>> getAllAppointments(String id) {
        Map<String,List<AppointmentResponse.AppointmentDetails>> output = new HashMap<>();
        Optional<List<Appointment>> appointments = repo.findByDoctor_Id(UUID.fromString(id));
        if(appointments.isEmpty()) {
            return output;
        }
        List<AppointmentResponse.AppointmentDetails> pending = new ArrayList<>();
        for(Appointment appointment : appointments.get()) {
            DoctorResponse.BasicDetails doctor = DoctorResponse.BasicDetails.fromEntity(appointment.getDoctor());
            PatientResponse patient = PatientResponse.fromEntity(appointment.getPatient());
            AppointmentResponse.AppointmentDetails data = new AppointmentResponse.AppointmentDetails(
                appointment.getId(),
                doctor,
                patient,
                appointment.getDate(),
                appointment.getTime(),
                appointment.getStatus().toString()
            );
            pending.add(data);
        }
        output.put("pending_appointments", pending);
        Optional<List<ArchivedAppointment>> archivedAppointments = archivedAppointmentRepo.findByDoctor_Id(UUID.fromString(id));
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

    public Map<String,List<AppointmentResponse.AppointmentDetails>> approveAppointment(String id, String appid) {
        Optional<Appointment> appointment = repo.findByIdAndDoctor_Id(UUID.fromString(appid),UUID.fromString(id));
        if(appointment.isEmpty()) {
            throw new CustomException.NotFound("Appointment not found");
        }
        Appointment appointment1 = appointment.get();
        if(appointment1.getStatus() != Appointment.AppointmentStatus.PENDING) {
            throw new CustomException.BadRequest("Appointment status is not PENDING");
        }
        String dateStr = appointment1.getDate();
        String timeStr = appointment1.getTime();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate date = LocalDate.parse(dateStr, dateFormatter);
        LocalTime time = LocalTime.parse(timeStr);
        LocalDateTime inputDateTime = LocalDateTime.of(date, time);
        LocalDateTime now = LocalDateTime.now();
        if (!inputDateTime.isAfter(now)) {
            throw new CustomException.BadRequest("Only future appointments can be approved.");
        }

        appointment1.setStatus(Appointment.AppointmentStatus.CONFIRMED);
        repo.save(appointment1);
        return getAllAppointments(id);
    }

}
