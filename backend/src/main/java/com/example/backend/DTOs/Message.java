package com.example.backend.DTOs;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Message {
    private Long id;
    private String temporaryId;
    private Long chatId;
    private Long senderId;
    private Long recipientId;
    private String content;
    private String type;
    private Boolean isRead;
    private LocalDateTime createdAt;
}