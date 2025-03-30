package com.speproject.admin_service.service;

import com.speproject.admin_service.dto.AppointmentResponse;
import com.speproject.admin_service.dto.DoctorRequest;
import com.speproject.admin_service.dto.DoctorResponse;
import com.speproject.admin_service.dto.PatientResponse;
import com.speproject.admin_service.entity.Appointment;
import com.speproject.admin_service.entity.ArchivedAppointment;
import com.speproject.admin_service.entity.Doctor;
import com.speproject.admin_service.entity.User;
import com.speproject.admin_service.exception.CustomException;
import com.speproject.admin_service.helper.EncryptionService;
import com.speproject.admin_service.mapper.DoctorMapper;
import com.speproject.admin_service.mapper.PatientMapper;
import com.speproject.admin_service.repo.AppointmentRepo;
import com.speproject.admin_service.repo.ArchivedAppointmentRepo;
import com.speproject.admin_service.repo.DoctorRepo;
import com.speproject.admin_service.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorRepo repo;
    private final AppointmentRepo appointmentRepo;
    private final ArchivedAppointmentRepo archivedAppointmentRepo;
    private final UserRepo userRepo;
    private final DoctorMapper mapper;
    private final EncryptionService encryptionService;

    public Map<String, List<DoctorResponse.BasicDetails>> getALlDoctors() {
        List<Doctor> doctors = repo.findAll();
        return doctors.stream()
                .map(DoctorResponse.BasicDetails::fromEntity)
                .collect(Collectors.groupingBy(DoctorResponse.BasicDetails::getSpecialization));
    }

    public User registerUser(DoctorRequest.AddRequest doctorRequest) {
        User user = new User();
        Optional<User> existingUser = userRepo.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new CustomException.BadRequest("User already exists");
        }
        user.setEmail(doctorRequest.email());
        user.setName(doctorRequest.name());
        user.setPassword(encryptionService.encode(doctorRequest.password()));  // Encode password
        user.setRole("DOCTOR");
        user = userRepo.save(user);
        return user;
    }


    public DoctorResponse.CompleteDetails createDoctor(DoctorRequest.AddRequest doctorRequest, String userId) {
        User user = userRepo.findById(UUID.fromString(userId))
                .orElseThrow(() -> new CustomException.BadRequest("User does not exist"));
        Doctor doctor = mapper.toEntity(doctorRequest, userId);
        doctor.setUser(user);
        repo.save(doctor);

        return getDoctorById(userId);
    }

    public void deleteDoctor(String doctorId) {
        Optional<User> user = userRepo.findById(UUID.fromString(doctorId));
        if (user.isPresent()) {
            userRepo.delete(user.get());
        }else throw new CustomException.BadRequest("Doctor does not exist");
    }

    public DoctorResponse.CompleteDetails getDoctorById(String docid) {
        Optional<Doctor> doctor = repo.findById(UUID.fromString(docid));
        if(doctor.isEmpty()){
            throw new CustomException.NotFound("Doctor not found");
        }
        Doctor doctorData = doctor.get();
        Optional<List<Appointment>> appointments = appointmentRepo.findByDoctor_Id(UUID.fromString(docid));
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

        Map<String,List<AppointmentResponse.AppointmentDetails>> doctorAppointmentDetails = new HashMap<>();
        List<AppointmentResponse.AppointmentDetails> pending = new ArrayList<>();
        if(!appointmentList.isEmpty()){
            for (Appointment appointment : appointmentList) {
                DoctorResponse.BasicDetails doctorCuur = DoctorResponse.BasicDetails.fromEntity(appointment.getDoctor());
                PatientResponse patient = PatientResponse.fromEntity(appointment.getPatient());
                AppointmentResponse.AppointmentDetails data = new AppointmentResponse.AppointmentDetails(
                        appointment.getId(),
                        doctorCuur,
                        patient,
                        appointment.getDate(),
                        appointment.getTime(),
                        appointment.getStatus().toString()
                );
                pending.add(data);
            }

        }
        doctorAppointmentDetails.put("pending_appointments", pending);
        Optional<List<ArchivedAppointment>> archivedAppointments = archivedAppointmentRepo.findByDoctor_Id(UUID.fromString(docid));
        List<AppointmentResponse.AppointmentDetails> old = new ArrayList<>();
        if(!archivedAppointments.isEmpty()) {
            for (ArchivedAppointment appointment : archivedAppointments.get()) {
                DoctorResponse.BasicDetails doctorCurr = DoctorResponse.BasicDetails.fromEntity(appointment.getDoctor());
                PatientResponse patient = PatientResponse.fromEntity(appointment.getPatient());
                AppointmentResponse.AppointmentDetails data = new AppointmentResponse.AppointmentDetails(
                        appointment.getAppointment_id(),
                        doctorCurr,
                        patient,
                        appointment.getDate(),
                        appointment.getTime(),
                        appointment.getStatus().toString()
                );
                old.add(data);
            }
        }
        doctorAppointmentDetails.put("completed_appointments", old);
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
