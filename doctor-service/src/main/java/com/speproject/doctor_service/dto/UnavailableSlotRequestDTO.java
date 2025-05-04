package com.speproject.doctor_service.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class UnavailableSlotRequestDTO {
    private Map<String, List<String>> slots; // key: date, value: list of time ranges
}
