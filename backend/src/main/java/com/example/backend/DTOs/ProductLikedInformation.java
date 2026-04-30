package com.example.backend.DTOs;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductLikedInformation {
    Long id;
    String ownerEmail;
    String ownerName;
    String ownerProfilePhoto;
    String title;
    String description;
    BigDecimal price;
    String condition;
    String status;
    String photoFirst;
    String photoSecond;
    String photoThird;
    LocalDateTime createdAt;
    Boolean liked;
    String myEmail;
    String ownerStatus;

    public ProductLikedInformation() {
    }

    public ProductLikedInformation(Long id) {
        this.id = id;
    }
}

