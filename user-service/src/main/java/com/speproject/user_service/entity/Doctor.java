package com.speproject.user_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.Pair;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @Column(name = "doctor_id", updatable = false, nullable = false)
    private UUID id; // This will be the same as user_id in User entity

    @OneToOne
    @MapsId // This annotation indicates that the primary key of this entity is also the primary key of the associated entity
    @JoinColumn(name = "doctor_id", nullable = false, foreignKey = @ForeignKey(name = "fk_doctor_user"))
    private User user;

    @Column(name = "specialization", nullable = false, length = 100)
    private String specialization;

    @Column(name = "started_year")
    private Integer started_year;

    @Column(name = "consultation_fee", precision = 10, scale = 2)
    private BigDecimal consultation_fee;

    @Column(name = "about", columnDefinition = "TEXT")
    private String about;

    @Column(name = "image")
    private String image;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", updatable = false, nullable = false)
    private Date created_at;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at", nullable = false)
    private Date updated_at;

    @PrePersist
    protected void onCreate() {
        created_at = new Date();
        updated_at = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updated_at = new Date();
    }

    public Map<String, List<String>> getAvailableSlots(List<Pair<String, String>> bookedSlots) {
        Map<String, List<String>> availableSlots = new LinkedHashMap<>();
        LocalDate today = LocalDate.now();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

        // Generate slots for the next 7 days
        for (int i = 0; i < 7; i++) {
            LocalDate currentDate = today.plusDays(i);
            String formattedDate = currentDate.format(dateFormatter);
            List<String> slots = new ArrayList<>();

            for (int j = 10; j < 21; j++) { // Time slots from 10:00 to 20:00
                String timeSlot = String.format("%02d:00", j);
                Pair<String, String> temp = new Pair<>(formattedDate, timeSlot); // Create a Pair with date and time

                if (bookedSlots.contains(temp)) {
                    continue; // Skip booked slots
                }

                // Adding time to the slots list
                slots.add(timeSlot);
            }

            availableSlots.put(formattedDate, slots); // Add the date and its available slots to the map
        }

        return availableSlots;
    }

}