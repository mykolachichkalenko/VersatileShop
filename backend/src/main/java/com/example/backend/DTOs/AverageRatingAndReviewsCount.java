package com.example.backend.DTOs;

import lombok.Data;

@Data
public class AverageRatingAndReviewsCount {
    private Double averageRating;
    private Integer reviewsCount;
}
