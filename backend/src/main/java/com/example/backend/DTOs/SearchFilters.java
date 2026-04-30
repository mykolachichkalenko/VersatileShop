package com.example.backend.DTOs;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class SearchFilters {
    private String condition;
    private BigDecimal fromPrice;
    private BigDecimal toPrice;
    private Double vectorDistance;
    private Boolean showNewProducts;
}
