package com.speproject.doctor_service.service;

import com.speproject.doctor_service.dto.AppointmentResponse;
import com.speproject.doctor_service.dto.DoctorResponse;
import com.speproject.doctor_service.entity.Appointment;
import com.speproject.doctor_service.entity.Doctor;
import com.speproject.doctor_service.entity.UnavailableSlot;
import com.speproject.doctor_service.exception.CustomException;
import com.speproject.doctor_service.mapper.AppointmentMapper;
import com.speproject.doctor_service.mapper.PatientMapper;
import com.speproject.doctor_service.repo.AppointmentRepo;
import com.speproject.doctor_service.repo.DoctorRepo;
import com.speproject.doctor_service.repo.UnavailableSlotRepo;
import com.speproject.doctor_service.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.Pair;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorRepo repo;
    private final AppointmentRepo appointmentRepo;
    private final UserRepo userRepo;
    private final PatientMapper mapper;
    private final UnavailableSlotRepo unavailableSlotRepo;
    private final AppointmentService appointmentService;
    private static final Logger log = LoggerFactory.getLogger(DoctorService.class);

    public static final List<Pair<LocalTime, LocalTime>> FIXED_SLOTS = List.of(
            new Pair<>(LocalTime.of(9, 0), LocalTime.of(10, 0)),
            new Pair<>(LocalTime.of(10, 0), LocalTime.of(11, 0)),
            new Pair<>(LocalTime.of(11, 0), LocalTime.of(12, 0)),
            new Pair<>(LocalTime.of(12, 0), LocalTime.of(13, 0)),
            new Pair<>(LocalTime.of(13, 0), LocalTime.of(14, 0)),
            new Pair<>(LocalTime.of(14, 0), LocalTime.of(15, 0)),
            new Pair<>(LocalTime.of(15, 0), LocalTime.of(16, 0)),
            new Pair<>(LocalTime.of(16, 0), LocalTime.of(17, 0)),
            new Pair<>(LocalTime.of(17, 0), LocalTime.of(18, 0)),
            new Pair<>(LocalTime.of(18, 0), LocalTime.of(19, 0)),
            new Pair<>(LocalTime.of(19, 0), LocalTime.of(20, 0)),
            new Pair<>(LocalTime.of(20, 0), LocalTime.of(21, 0))
    );

    public DoctorResponse.CompleteDetails getDoctorById(String id) {
        UUID doctorId = UUID.fromString(id);

        // 1. Fetch doctor entity
        Doctor doctor = repo.findById(doctorId)
                .orElseThrow(() -> new CustomException.NotFound("Doctor not found"));

        // 2. Fetch unavailable slots for next 7 days
        LocalDate today = LocalDate.now();
        LocalDate endDate = today.plusDays(6); // next 7 days

        List<UnavailableSlot> unavailableSlots = unavailableSlotRepo
                .findByDoctor_IdAndDateBetween(doctorId, today, endDate);

        // 3. Get available slots from Doctor entity method
        Map<LocalDate, List<String>> rawAvailableSlots = doctor.getAvailableSlots(unavailableSlots);

        // 4. Convert LocalDate keys to formatted string for response
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        Map<String, List<String>> availableSlots = rawAvailableSlots.entrySet().stream()
                .collect(Collectors.toMap(
                        entry -> entry.getKey().format(formatter),
                        Map.Entry::getValue,
                        (a, b) -> b,
                        LinkedHashMap::new // to preserve order
                ));

        // 5. Get appointments for doctor
        Map<String, List<AppointmentResponse.AppointmentDetails>> doctorAppointmentDetails =
                appointmentService.getAllAppointments(id);

        // 6. Calculate experience
        int currentYear = LocalDate.now().getYear();
        int yearsOfExperience = currentYear - doctor.getStarted_year();

        // 7. Build response
        DoctorResponse.CompleteDetails completeDetails = new DoctorResponse.CompleteDetails(
                doctor.getId(),
                doctor.getUser().getName(),
                doctor.getSpecialization(),
                yearsOfExperience,
                doctor.getConsultation_fee(),
                doctor.getAbout(),
                doctor.getImage(),
                doctor.getDegree(),
                doctor.getAddress(),
                availableSlots,
                doctorAppointmentDetails
        );

        log.info("Fetched doctor with ID: {}", id);
        return completeDetails;
    }


}
