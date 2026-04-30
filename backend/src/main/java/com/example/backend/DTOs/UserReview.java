package com.example.backend.DTOs;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserReview {
    private Long id;
    private String ownerName;
    private String ownerAvatarUrl;
    private String ownerEmail;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;
}
