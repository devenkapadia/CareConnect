package com.speproject.doctor_service.repo;

import com.speproject.doctor_service.entity.UnavailableSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface UnavailableSlotRepo extends JpaRepository<UnavailableSlot, UUID> {
    List<UnavailableSlot> findByDoctor_IdAndDateBetween(UUID doctorId, LocalDate startDate, LocalDate endDate);

    boolean existsByDoctor_IdAndDateAndStartTimeAndEndTime(UUID doctorId, LocalDate date, LocalTime startTime, LocalTime endTime);
}