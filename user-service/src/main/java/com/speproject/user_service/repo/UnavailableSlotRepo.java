package com.speproject.user_service.repo;

import com.speproject.doctor_service.entity.UnavailableSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface UnavailableSlotRepo extends JpaRepository<UnavailableSlot, UUID> {
    List<UnavailableSlot> findByDoctor_IdAndDateBetween(UUID doctorId, LocalDate startDate, LocalDate endDate);
}