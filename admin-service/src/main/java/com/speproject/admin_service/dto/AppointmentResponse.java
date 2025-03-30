package com.speproject.admin_service.dto;

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
