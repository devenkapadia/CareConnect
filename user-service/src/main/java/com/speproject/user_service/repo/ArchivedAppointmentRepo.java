package com.speproject.user_service.repo;

import com.speproject.user_service.entity.ArchivedAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ArchivedAppointmentRepo extends JpaRepository<ArchivedAppointment, UUID> {
    Optional<List<ArchivedAppointment>> findByDoctor_Id(UUID doctorId);
    Optional<List<ArchivedAppointment>> findByUser_Id(UUID userId);
    Optional<List<ArchivedAppointment>> findByUser_IdAndDoctor_Id(UUID userId, UUID doctorId);
    Optional<List<ArchivedAppointment>> findByDoctor_IdAndDateAndTime(UUID doctorId, String date, String time);
}
