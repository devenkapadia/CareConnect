package com.speproject.user_service.service;

import com.speproject.user_service.dto.DoctorResponse;
import com.speproject.user_service.dto.PatientRequest;
import com.speproject.user_service.dto.PatientResponse;
import com.speproject.user_service.entity.Appointment;
import com.speproject.user_service.entity.Doctor;
import com.speproject.user_service.entity.Patient;
import com.speproject.user_service.entity.User;
import com.speproject.user_service.exception.CustomException;
import com.speproject.user_service.mapper.PatientMapper;
import com.speproject.user_service.repo.AppointmentRepo;
import com.speproject.user_service.repo.DoctorRepo;
import com.speproject.user_service.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.Pair;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorRepo repo;
    private final AppointmentRepo appointmentRepo;
    private final UserRepo userRepo;
    private final PatientMapper mapper;

    public Map<String, List<DoctorResponse.BasicDetails>> getALlDoctors(String id) {
        List<Doctor> doctors = repo.findAll();
        return doctors.stream()
                .map(DoctorResponse.BasicDetails::fromEntity)
                .collect(Collectors.groupingBy(DoctorResponse.BasicDetails::getSpecialization));
    }

    public DoctorResponse.CompleteDetails getDoctorById(String id,String reqid) {
        Optional<Doctor> doctor = repo.findById(UUID.fromString(reqid));
        if(doctor.isEmpty()){
            throw new CustomException.NotFound("Doctor not found");
        }
        Doctor doctorData = doctor.get();
        Optional<List<Appointment>> appointments = appointmentRepo.findByDoctor_Id(UUID.fromString(reqid));
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

        Optional<List<Appointment>> myAppointments = appointmentRepo.findByUser_IdAndDoctor_Id(UUID.fromString(id),UUID.fromString(reqid));
        List<Appointment> appointments1 = new ArrayList<>();
        if(myAppointments.isPresent()){
            appointments1 = myAppointments.get();
        }
        List<DoctorResponse.AppointmentDetails> doctorAppointmentDetails = new ArrayList<>();
        for(Appointment appointment : appointments1) {
            DoctorResponse.AppointmentDetails temp = new DoctorResponse.AppointmentDetails(
                appointment.getAppointment_id(),
                appointment.getDate(),
                appointment.getTime()
            );
            doctorAppointmentDetails.add(temp);
        }


        int currentYear = new Date().getYear() + 1900; // getYear() returns year since 1900
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
