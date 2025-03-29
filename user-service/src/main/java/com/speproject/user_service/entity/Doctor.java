package com.speproject.user_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

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
}