package com.speproject.user_service.service;

import com.speproject.user_service.dto.PatientRequest;
import com.speproject.user_service.dto.PatientResponse;
import com.speproject.user_service.entity.Patient;
import com.speproject.user_service.entity.User;
import com.speproject.user_service.exception.CustomException;
import com.speproject.user_service.mapper.PatientMapper;
import com.speproject.user_service.repo.PatientRepo;
import com.speproject.user_service.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepo repo;
    private final UserRepo userRepo;
    private final PatientMapper mapper;

    public List<PatientResponse> addPatient(PatientRequest.AddRequest request, String id) {
        Patient patient = mapper.toEntity(request);
        Optional<User> user = userRepo.findById(UUID.fromString(id));
        if(user.isEmpty()) {
            throw new CustomException.NotFound("User not found");
        }
        patient.setUser(user.get());
        repo.save(patient);
        return getALlPatient(id);
    }

    public List<PatientResponse> getALlPatient(String id) {
        Optional<List<Patient>> patients = repo.findByUser_Id(UUID.fromString(id));
        if(patients.isEmpty()) {
            return new ArrayList<>();
        }
        return patients.get().stream() // Get the List and create a stream of Patient
                .map(PatientResponse::fromEntity)
                .collect(Collectors.toList());
    }



}
