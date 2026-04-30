package com.example.backend.DTOs;

import lombok.Data;

@Data
public class Seller {
    private Long id;
    private String name;
    private String email;
    private String avatarUrl;
}
