package com.speproject.user_service.repo;

import com.speproject.user_service.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, UUID> {

}
