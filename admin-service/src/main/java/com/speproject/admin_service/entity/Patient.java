package com.speproject.admin_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "patients")
public class Patient {

    public enum GenderType {
        MALE,
        FEMALE,
        OTHER
    }


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "patient_id", updatable = false, nullable = false)
    private UUID patient_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_patient_user"))
    private User user;

    @Column(name = "first_name", nullable = false, length = 100)
    private String first_name;

    @Column(name = "last_name", nullable = false, length = 100)
    private String last_name;

    @Temporal(TemporalType.DATE)
    @Column(name = "date_of_birth")
    private Date date_of_birth;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private GenderType gender;

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
