package com.speproject.doctor_service.service;

import com.speproject.doctor_service.dto.UnavailableSlotRequestDTO;
import com.speproject.doctor_service.entity.Doctor;
import com.speproject.doctor_service.entity.UnavailableSlot;
import com.speproject.doctor_service.repo.DoctorRepo;
import com.speproject.doctor_service.repo.UnavailableSlotRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UnavailableSlotService {

    private final UnavailableSlotRepo slotRepo;
    private final DoctorRepo doctorRepo;

    public void saveUnavailableSlots(UUID doctorId, UnavailableSlotRequestDTO dto) {
        Optional<Doctor> doctorOpt = doctorRepo.findById(doctorId);
        if (doctorOpt.isEmpty()) throw new RuntimeException("Doctor not found");

        Doctor doctor = doctorOpt.get();
        List<UnavailableSlot> slotsToSave = new ArrayList<>();

        for (Map.Entry<String, List<String>> entry : dto.getSlots().entrySet()) {
            LocalDate date = LocalDate.parse(entry.getKey());

            for (String timeRange : entry.getValue()) {
                String[] parts = timeRange.split(" - ");
                LocalTime startTime = LocalTime.parse(parts[0]);
                LocalTime endTime = LocalTime.parse(parts[1]);

                // Check if the slot already exists for this doctor on the same date and time range
                boolean slotExists = slotRepo.existsByDoctor_IdAndDateAndStartTimeAndEndTime(doctorId, date, startTime, endTime);

                if (slotExists) {
                    throw new RuntimeException("Slot already marked as unavailable for this doctor.");
                }

                UnavailableSlot slot = UnavailableSlot.builder()
                        .doctor(doctor)
                        .date(date)
                        .startTime(startTime)
                        .endTime(endTime)
                        .build();

                slotsToSave.add(slot);
            }
        }

        slotRepo.saveAll(slotsToSave);
    }


    public List<UnavailableSlot> getUnavailableSlots(UUID doctorId, LocalDate startDate, LocalDate endDate) {
        return slotRepo.findByDoctor_IdAndDateBetween(doctorId, startDate, endDate);
    }
}
