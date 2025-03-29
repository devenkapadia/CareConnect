package com.speproject.user_service.service;

import com.speproject.user_service.dto.PublicRequest;
import com.speproject.user_service.entity.Feedback;
import com.speproject.user_service.entity.User;
import com.speproject.user_service.exception.CustomException;
import com.speproject.user_service.mapper.FeedbackMapper;
import com.speproject.user_service.repo.FeedbackRepo;
import com.speproject.user_service.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PublicService {
    private final FeedbackRepo repo;
    private final FeedbackMapper mapper;

    public void addFeeback(PublicRequest.FeedbackRequest request) {
        try {
            Feedback feedback = mapper.toEntity(request);
            repo.save(feedback);
        }
        catch (Exception e) {
            throw new CustomException.BadRequest(e.getMessage());
        }
    }


}
