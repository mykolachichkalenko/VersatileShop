package com.example.backend.DTOs;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserProfile {
    Long id;
    String name;
    String email;
    String avatarUrl;
    String city;
    String department;
    String status;
    LocalDateTime createdAt;
}
