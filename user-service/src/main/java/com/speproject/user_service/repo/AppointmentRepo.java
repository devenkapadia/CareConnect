package com.speproject.user_service.repo;

import com.speproject.user_service.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AppointmentRepo extends JpaRepository<Appointment, UUID> {
    Optional<List<Appointment>> findByDoctor_Id(UUID doctorId);
    Optional<List<Appointment>> findByUser_Id(UUID userId);
    Optional<List<Appointment>> findByUser_IdAndDoctor_Id(UUID userId, UUID doctorId);
    Optional<List<Appointment>> findByDoctor_IdAndDateAndTime(UUID doctorId, String date, String time);
}
