package com.speproject.admin_service.service;

import com.speproject.admin_service.dto.*;
import com.speproject.admin_service.entity.*;
import com.speproject.admin_service.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepo repo;
    private final ArchivedAppointmentRepo archivedAppointmentRepo;


    public Map<String,List<AppointmentResponse.AppointmentDetails>> getAllAppointments() {
        Map<String,List<AppointmentResponse.AppointmentDetails>> output = new HashMap<>();
        List<Appointment> appointments = repo.findAll();
        List<AppointmentResponse.AppointmentDetails> pending = new ArrayList<>();
        if(!appointments.isEmpty()) {


            for (Appointment appointment : appointments) {
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

        }
        output.put("pending_appointments", pending);
        List<ArchivedAppointment> archivedAppointments = archivedAppointmentRepo.findAll();
        List<AppointmentResponse.AppointmentDetails> old = new ArrayList<>();
        if(!archivedAppointments.isEmpty()) {


            for (ArchivedAppointment appointment : archivedAppointments) {
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

        }
        output.put("completed_appointments", old);
        return output;
    }
}
