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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class PublicService {
    private final FeedbackRepo repo;
    private final FeedbackMapper mapper;
    private static final Logger log = LoggerFactory.getLogger(PublicService.class);
    public void addFeeback(PublicRequest.FeedbackRequest request) {
        try {
            Feedback feedback = mapper.toEntity(request);
            repo.save(feedback);
            log.info("Feedback added successfully : " + feedback.getEmail());
        }
        catch (Exception e) {
            throw new CustomException.BadRequest(e.getMessage());
        }
    }


}
