package com.speproject.user_service.controller;

import com.speproject.user_service.dto.PublicRequest;
import com.speproject.user_service.service.PublicService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user/public/")
public class PublicController {
    private final PublicService publicService;

    @PostMapping("/feedback")
    public String getProfile(@RequestBody @Valid PublicRequest.FeedbackRequest feedbackRequest) {
        publicService.addFeeback(feedbackRequest);
        return "success";
    }
}
