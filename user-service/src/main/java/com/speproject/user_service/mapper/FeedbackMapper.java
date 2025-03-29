package com.speproject.user_service.mapper;

import com.speproject.user_service.dto.PublicRequest;
import com.speproject.user_service.entity.Feedback;
import org.springframework.stereotype.Service;

@Service
public class FeedbackMapper {
    public Feedback toEntity(PublicRequest.FeedbackRequest request) {
        return Feedback.builder()
                .name(request.name())
                .email(request.email())
                .comments(request.comments())
                .build();
    }
}
