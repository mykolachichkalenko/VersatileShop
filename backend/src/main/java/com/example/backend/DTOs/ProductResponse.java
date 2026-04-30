package com.example.backend.DTOs;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductResponse {
    Long id;
    String ownerEmail;
    String title;
    String description;
    BigDecimal price;
    String condition;
    String status;
    String photoFirst;
    String photoSecond;
    String photoThird;
    LocalDateTime createdAt;

    public ProductResponse(){}

    public ProductResponse(Long id){
        this.id = id;
    }
}
