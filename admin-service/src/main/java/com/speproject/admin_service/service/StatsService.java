package com.speproject.admin_service.service;

import com.speproject.admin_service.entity.Appointment;
import com.speproject.admin_service.entity.ArchivedAppointment;
import com.speproject.admin_service.entity.Doctor;
import com.speproject.admin_service.entity.User;
import com.speproject.admin_service.mapper.PatientMapper;
import com.speproject.admin_service.repo.AppointmentRepo;
import com.speproject.admin_service.repo.ArchivedAppointmentRepo;
import com.speproject.admin_service.repo.DoctorRepo;
import com.speproject.admin_service.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class StatsService {
    private final DoctorRepo repo;
    private final AppointmentRepo appointmentRepo;
    private final UserRepo userRepo;
    private final PatientMapper mapper;
    private final ArchivedAppointmentRepo archivedAppointmentRepo;
    public Map<String, Long> getStats() {
        Map<String, Long> output = new LinkedHashMap<>();
        output.put("doctors", repo.count());
        output.put("appointments", appointmentRepo.count() + archivedAppointmentRepo.count());
        output.put("users", userRepo.count());
        return output;
    }
}
