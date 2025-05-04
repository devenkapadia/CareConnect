package com.speproject.user_service.service;

import com.speproject.user_service.dto.AppointmentResponse;
import com.speproject.user_service.dto.DoctorResponse;
import com.speproject.user_service.dto.PatientRequest;
import com.speproject.user_service.dto.PatientResponse;
import com.speproject.user_service.entity.*;
import com.speproject.user_service.exception.CustomException;
import com.speproject.user_service.mapper.PatientMapper;
import com.speproject.user_service.repo.*;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.Pair;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorRepo repo;
    private final AppointmentRepo appointmentRepo;
    private final UserRepo userRepo;
    private final PatientMapper mapper;
    private final ArchivedAppointmentRepo archivedAppointmentRepo;
    private final UnavailableSlotRepo unavailableSlotRepo;
    private final AppointmentService appointmentService;
    private static final Logger log = LoggerFactory.getLogger(DoctorService.class);

    public Map<String, List<DoctorResponse.BasicDetails>> getALlDoctors(String id) {
        List<Doctor> doctors = repo.findAll();
        log.info("Fetched all doctors successfully");
        return doctors.stream()
                .map(DoctorResponse.BasicDetails::fromEntity)
                .collect(Collectors.groupingBy(DoctorResponse.BasicDetails::getSpecialization));
    }
    public static boolean isUUID(String str) {
        if (str == null) {
            return false;
        }
        try {
            UUID.fromString(str);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

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
