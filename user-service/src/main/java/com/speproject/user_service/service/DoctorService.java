package com.speproject.user_service.service;

import com.speproject.user_service.dto.DoctorResponse;
import com.speproject.user_service.dto.PatientRequest;
import com.speproject.user_service.dto.PatientResponse;
import com.speproject.user_service.entity.Doctor;
import com.speproject.user_service.entity.Patient;
import com.speproject.user_service.entity.User;
import com.speproject.user_service.exception.CustomException;
import com.speproject.user_service.mapper.PatientMapper;
import com.speproject.user_service.repo.DoctorRepo;
import com.speproject.user_service.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorRepo repo;
    private final UserRepo userRepo;
    private final PatientMapper mapper;

    public Map<String, List<DoctorResponse.BasicDetails>> getALlDoctors(String id) {
        List<Doctor> doctors = repo.findAll();
        return doctors.stream()
                .map(DoctorResponse.BasicDetails::fromEntity)
                .collect(Collectors.groupingBy(DoctorResponse.BasicDetails::getSpecialization));
    }
/*
    public DoctorResponse.CompleteDetails getDoctorById(String id,String reqid) {
        Optional<Doctor> doctor = repo.findById(UUID.fromString(id));
        if(doctor.isEmpty()){
            throw new CustomException.NotFound("Doctor not found");
        }

    }
*/

}
