package com.example.backend.DTOs;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductAIForm {
    private String title;
    private String description;
    private BigDecimal price;
    private String condition;
    public String photo;
}