package com.speproject.doctor_service.service;

import com.speproject.doctor_service.dto.AppointmentResponse;
import com.speproject.doctor_service.dto.DoctorResponse;
import com.speproject.doctor_service.entity.Appointment;
import com.speproject.doctor_service.entity.Doctor;
import com.speproject.doctor_service.exception.CustomException;
import com.speproject.doctor_service.mapper.AppointmentMapper;
import com.speproject.doctor_service.mapper.PatientMapper;
import com.speproject.doctor_service.repo.AppointmentRepo;
import com.speproject.doctor_service.repo.DoctorRepo;
import com.speproject.doctor_service.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.Pair;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorRepo repo;
    private final AppointmentRepo appointmentRepo;
    private final UserRepo userRepo;
    private final PatientMapper mapper;
    private final AppointmentService appointmentService;

    public DoctorResponse.CompleteDetails getDoctorById(String id) {
        Optional<Doctor> doctor = repo.findById(UUID.fromString(id));
        if(doctor.isEmpty()){
            throw new CustomException.NotFound("Doctor not found");
        }
        Doctor doctorData = doctor.get();
        Optional<List<Appointment>> appointments = appointmentRepo.findByDoctor_Id(UUID.fromString(id));
        List<Appointment> appointmentList = new ArrayList<>();
        if(appointments.isPresent()){
            appointmentList = appointments.get();
        }
        List<Pair<String, String>> bookedSlots = new ArrayList<>();
        for (Appointment appointment : appointmentList) {
            String date = appointment.getDate();
            String time = appointment.getTime();
            bookedSlots.add(new Pair<>(date, time)); // Store as a Pair
        }

        Map<String, List<String>> availableSlots = doctor.get().getAvailableSlots(bookedSlots);
        Map<String,List<AppointmentResponse.AppointmentDetails>> doctorAppointmentDetails = appointmentService.getAllAppointments(id);
        int currentYear = new Date().getYear() + 1900;
        int yearsOfExperience = currentYear - doctorData.getStarted_year();

        DoctorResponse.CompleteDetails completeDetails = new DoctorResponse.CompleteDetails(
                doctorData.getId(),
                doctorData.getUser().getName(),
                doctorData.getSpecialization(),
                yearsOfExperience,
                doctorData.getConsultation_fee(),
                doctorData.getAbout(),
                doctorData.getImage(),
                doctorData.getDegree(),
                doctorData.getAddress(),
                availableSlots,
                doctorAppointmentDetails
        );
        return completeDetails;
    }


}
