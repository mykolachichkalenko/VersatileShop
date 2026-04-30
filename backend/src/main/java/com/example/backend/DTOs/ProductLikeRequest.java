package com.example.backend.DTOs;

import lombok.Data;

@Data
public class ProductLikeRequest {
    private String email;
    private Long productId;
    private Boolean liked;
}
