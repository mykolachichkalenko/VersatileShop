package com.example.backend.DTOs;

import lombok.Data;

import java.util.List;

@Data
public class RecommendedProductResponse {
    private List<ProductResponse> products;
    private String isDefaultFinding;
    private Integer offset;
}
