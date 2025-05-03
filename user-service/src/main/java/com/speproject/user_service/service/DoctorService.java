package com.speproject.user_service.service;

import com.speproject.user_service.dto.AppointmentResponse;
import com.speproject.user_service.dto.DoctorResponse;
import com.speproject.user_service.dto.PatientRequest;
import com.speproject.user_service.dto.PatientResponse;
import com.speproject.user_service.entity.*;
import com.speproject.user_service.exception.CustomException;
import com.speproject.user_service.mapper.PatientMapper;
import com.speproject.user_service.repo.AppointmentRepo;
import com.speproject.user_service.repo.ArchivedAppointmentRepo;
import com.speproject.user_service.repo.DoctorRepo;
import com.speproject.user_service.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.Pair;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.text.SimpleDateFormat;
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

    public DoctorResponse.CompleteDetails getDoctorById(String reqid) {
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
        Map<String, List<AppointmentResponse.AppointmentDetails>> doctorAppointmentDetails = new HashMap<>();
        /*if(isUUID(id)) {
            Optional<List<Appointment>> myAppointments = appointmentRepo.findByUser_IdAndDoctor_Id(UUID.fromString(id), UUID.fromString(reqid));
            List<Appointment> appointments1 = new ArrayList<>();
            if (myAppointments.isPresent()) {
                appointments1 = myAppointments.get();
            }

            Optional<List<Appointment>> appointmentsCurr = appointmentRepo.findByUser_IdAndDoctor_Id(UUID.fromString(id), UUID.fromString(reqid));
            if (!appointmentsCurr.isEmpty()) {
                List<AppointmentResponse.AppointmentDetails> pending = new ArrayList<>();
                for (Appointment appointment : appointmentsCurr.get()) {
                    DoctorResponse.BasicDetails doctorCuur = DoctorResponse.BasicDetails.fromEntity(appointment.getDoctor());
                    PatientResponse patient = PatientResponse.fromEntity(appointment.getPatient());
                    AppointmentResponse.AppointmentDetails data = new AppointmentResponse.AppointmentDetails(
                            appointment.getAppointment_id(),
                            doctorCuur,
                            patient,
                            appointment.getDate(),
                            appointment.getTime(),
                            appointment.getStatus().toString()
                    );
                    pending.add(data);
                }

                doctorAppointmentDetails.put("pending_appointments", pending);
            }
            Optional<List<ArchivedAppointment>> archivedAppointments = archivedAppointmentRepo.findByUser_IdAndDoctor_Id(UUID.fromString(id), UUID.fromString(reqid));
            if (!archivedAppointments.isEmpty()) {
                List<AppointmentResponse.AppointmentDetails> old = new ArrayList<>();
                for (ArchivedAppointment appointment : archivedAppointments.get()) {
                    DoctorResponse.BasicDetails doctorCuur = DoctorResponse.BasicDetails.fromEntity(appointment.getDoctor());
                    PatientResponse patient = PatientResponse.fromEntity(appointment.getPatient());
                    AppointmentResponse.AppointmentDetails data = new AppointmentResponse.AppointmentDetails(
                            appointment.getAppointment_id(),
                            doctorCuur,
                            patient,
                            appointment.getDate(),
                            appointment.getTime(),
                            appointment.getStatus().toString()
                    );
                    old.add(data);
                }
                doctorAppointmentDetails.put("completed_appointments", old);
            }
        }else{
            doctorAppointmentDetails.put("pending_appointments", new ArrayList<>());
            doctorAppointmentDetails.put("completed_appointments", new ArrayList<>());
        }*/
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
                availableSlots
              //  doctorAppointmentDetails
        );
        log.info("Fetched doctor with ID: " + reqid);
        return completeDetails;
    }


}
