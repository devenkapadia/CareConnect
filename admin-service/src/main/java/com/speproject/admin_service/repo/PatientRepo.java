package com.speproject.admin_service.repo;

import com.speproject.admin_service.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PatientRepo extends JpaRepository<Patient, UUID> {
    Optional<List<Patient>> findByUser_Id(UUID userId);
}
