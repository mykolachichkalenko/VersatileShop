package com.example.backend.DTOs;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Chat {
    private Long id;
    private String userName;
    private String userEmail;
    private String userAvatar;
    private LocalDateTime updatedAt;
    private Integer unreadMessagesCount;
}
