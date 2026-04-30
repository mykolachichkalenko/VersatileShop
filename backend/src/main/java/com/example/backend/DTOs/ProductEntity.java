package com.example.backend.DTOs;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductEntity {
    Long id;
    String ownerEmail;
    String title;
    String description;
    BigDecimal price;
    String condition;
    String status;
    Double[] vector;
    String photoFirst;
    String photoSecond;
    String photoThird;
    LocalDateTime createdAt;
}
