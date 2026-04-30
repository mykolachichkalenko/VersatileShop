package com.example.backend.DTOs;

import lombok.Data;

@Data
public class UserChatInfo {
    private String userEmail;
    private String userName;
    private String userAvatar;
    private String userStatus;
}
