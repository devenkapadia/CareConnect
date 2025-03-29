package com.speproject.user_service.dto;

import com.speproject.user_service.entity.Patient;
import com.speproject.user_service.entity.User;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.UUID;



public class AppointmentResponse{
    public record AppointmentDetails(
            UUID appointmentId,
            DoctorResponse.BasicDetails doctor,
            PatientResponse patient,
            String date,
            String time,
            String status
    ){

    }
}
