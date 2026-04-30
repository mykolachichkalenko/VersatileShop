package com.example.backend.DTOs;

import lombok.Data;

@Data
public class UserInfo {
    private String userURL;
    private String userStatus;
    private String userName;
    private Boolean userOnline;
    private Double userRating;
    private Integer userReviewsCount;
}
