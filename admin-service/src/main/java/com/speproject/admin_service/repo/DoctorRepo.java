package com.speproject.admin_service.repo;

import com.speproject.admin_service.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface DoctorRepo extends JpaRepository<Doctor, UUID> {
    Optional<Doctor> findByUser_Id(UUID userId);
}
