package com.speproject.user_service.repo;

import com.speproject.user_service.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DoctorRepo extends JpaRepository<Doctor, UUID> {
    Optional<Doctor> findByUser_Id(UUID userId);
}
