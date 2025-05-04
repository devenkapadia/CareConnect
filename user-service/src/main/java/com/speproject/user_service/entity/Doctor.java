package com.speproject.user_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.Pair;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
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

    @Column(name = "degree")
    private String degree;

    @Column(name = "address")
    private String address;

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

    private static final List<Pair<LocalTime, LocalTime>> FIXED_SLOTS = List.of(
            new Pair<>(LocalTime.of(9, 0), LocalTime.of(10, 0)),
            new Pair<>(LocalTime.of(10, 0), LocalTime.of(11, 0)),
            new Pair<>(LocalTime.of(11, 0), LocalTime.of(12, 0)),
            new Pair<>(LocalTime.of(12, 0), LocalTime.of(13, 0)),
            new Pair<>(LocalTime.of(13, 0), LocalTime.of(14, 0)),
            new Pair<>(LocalTime.of(14, 0), LocalTime.of(15, 0)),
            new Pair<>(LocalTime.of(15, 0), LocalTime.of(16, 0)),
            new Pair<>(LocalTime.of(16, 0), LocalTime.of(17, 0)),
            new Pair<>(LocalTime.of(17, 0), LocalTime.of(18, 0)),
            new Pair<>(LocalTime.of(18, 0), LocalTime.of(19, 0)),
            new Pair<>(LocalTime.of(19, 0), LocalTime.of(20, 0)),
            new Pair<>(LocalTime.of(20, 0), LocalTime.of(21, 0))
    );


    public Map<LocalDate, List<String>> getAvailableSlots(List<UnavailableSlot> unavailableSlots) {
        Map<LocalDate, List<String>> availableSlots = new LinkedHashMap<>();
        LocalDate today = LocalDate.now();

        for (int i = 0; i < 7; i++) {
            LocalDate date = today.plusDays(i);
            List<Pair<LocalTime, LocalTime>> available = new ArrayList<>(FIXED_SLOTS);

            // Remove unavailable slots for this date
            for (UnavailableSlot slot : unavailableSlots) {
                if (slot.getDate().equals(date)) {
                    available.removeIf(s -> s.a.equals(slot.getStartTime()));
                }
            }

            List<String> slotStrings = available.stream()
                    .map(pair -> pair.a.toString() + " - " + pair.b.toString())
                    .collect(Collectors.toList());

            availableSlots.put(date, slotStrings);
        }

        return availableSlots;
    }

}