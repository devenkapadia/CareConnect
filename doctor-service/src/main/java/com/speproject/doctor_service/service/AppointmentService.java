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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepo repo;
    private final UserRepo userRepo;
    private final PatientRepo patientRepo;
    private final DoctorRepo doctorRepo;
    private final AppointmentMapper mapper;
    private final ArchivedAppointmentRepo archivedAppointmentRepo;
    private final RabbitMQProducer rabbitMQProducer;
    private static final Logger log = LoggerFactory.getLogger(AppointmentService.class);

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
        log.info("Fetched all appointments successfully");
        return output;
    }

    public Map<String,List<AppointmentResponse.AppointmentDetails>> updateAppointment(String id, String appid, Appointment.AppointmentStatus new_status) {
        Optional<Appointment> appointment = repo.findByIdAndDoctor_Id(UUID.fromString(appid),UUID.fromString(id));
        if(appointment.isEmpty()) {
            throw new CustomException.NotFound("Appointment not found");
        }
        Appointment appointment1 = appointment.get();
        if(appointment1.getStatus() != Appointment.AppointmentStatus.REQUESTED) {
            throw new CustomException.BadRequest("Appointment status is not REQUESTED");
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
        appointment1.setStatus(new_status);
        repo.save(appointment1);
        User user = appointment1.getUser();
        User doctor = appointment1.getDoctor().getUser();
        Patient patient = appointment1.getPatient();
        Map<String, String> map = new HashMap<>();
        map.put("email", user.getEmail());
        String status = new_status == Appointment.AppointmentStatus.PENDING ? "CONFIRMED" : "REJECTED";
        map.put("subject", "CONFIRMED: Appointment "+appointment1.getId().toString());
        map.put("message", "Patient " + patient.getFirst_name()+" "+ patient.getLast_name() + " your appointment with "+doctor.getName()+" was "+status);
        log.info("Email Sent", user.getEmail());
        rabbitMQProducer.sendMessage(map.toString());
        log.info("Updated appointment status successfully for appointment ID: " + appid + " to " + new_status);
        return getAllAppointments(id);
    }

}
