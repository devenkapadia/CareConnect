package com.speproject.doctor_service.dto;

import java.util.List;

public class UnavailableSlotDTO {
    private String date; // e.g., "04-05-2025"
    private List<String> timeSlot; // e.g., ["09:00 - 10:00", "12:00 - 13:00"]
}
