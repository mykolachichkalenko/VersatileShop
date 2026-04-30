package com.example.backend.Controllers;

import com.example.backend.DTOs.AverageRatingAndReviewsCount;
import com.example.backend.DTOs.UserReview;
import com.example.backend.Services.ReviewServices.UserReviewServices.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.awt.datatransfer.FlavorEvent;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserReviewController {

    private final UserReviewCreateService userReviewCreateService;
    private final UserReviewDeleteService userReviewDeleteService;
    private final UserReviewIsMyReviewExistsService userReviewIsMyReviewExistsService;
    private final UserReviewGetAverageRatingAndReviewsCountService userReviewGetAverageRatingAndReviewsCountService;
    private final UserReviewGetService userReviewGetService;

    public UserReviewController(UserReviewCreateService userReviewCreateService, UserReviewDeleteService userReviewDeleteService, UserReviewIsMyReviewExistsService userReviewIsMyReviewExistsService, UserReviewGetAverageRatingAndReviewsCountService userReviewGetAverageRatingAndReviewsCountService, UserReviewGetService userReviewGetService) {
        this.userReviewCreateService = userReviewCreateService;
        this.userReviewDeleteService = userReviewDeleteService;
        this.userReviewIsMyReviewExistsService = userReviewIsMyReviewExistsService;
        this.userReviewGetAverageRatingAndReviewsCountService = userReviewGetAverageRatingAndReviewsCountService;
        this.userReviewGetService = userReviewGetService;
    }

    @PostMapping("/review/create")
    public Mono<UserReview> createUserReview(@AuthenticationPrincipal OAuth2User user, @RequestBody Map map) {
        String myEmail = user.getAttribute("email");
        String userEmail = (String) map.get("email");
        String comment = (String) map.get("comment");
        Integer rating = (Integer) map.get("rating");

        return userReviewCreateService.createReview(myEmail, userEmail, rating, comment);
    }

    @PostMapping("/review/delete")
    public Mono<Boolean> deleteUserReview(@AuthenticationPrincipal OAuth2User user, @RequestBody Map map) {
        String myEmail = user.getAttribute("email");
        Integer id = (Integer) map.get("reviewId");
        String userEmail = (String) map.get("userEmail");

        return userReviewDeleteService.deleteReview(myEmail, Long.valueOf(id),userEmail);
    }


    @PostMapping("/reviews/isMyReviewExists")
    public Mono<Boolean> isMyReviewExists(@AuthenticationPrincipal OAuth2User user, @RequestBody Map map) {
        if (user == null) {
            return Mono.just(true);
        }

        String myEmail = user.getAttribute("email");
        String userEmail = (String) map.get("userEmail");

        if (myEmail.equals(userEmail)) {
            return Mono.just(true);
        }

        return userReviewIsMyReviewExistsService.isMyReviewExists(myEmail, userEmail);
    }

    @GetMapping("/reviews/AverageRatingAndReviewsCount/{email}")
    public Mono<AverageRatingAndReviewsCount> getUSerAverageRatingAndReviewsCount(@PathVariable String email) {
        return userReviewGetAverageRatingAndReviewsCountService.getAverageRatingAndReviewsCount(email);
    }

    @PostMapping("/reviews")
    public Flux<UserReview> getReviews(@RequestBody Map map) {
        String userEmail = (String) map.get("email");
        Integer minId = (Integer) map.get("minId");

        return userReviewGetService.getReview(userEmail, minId.longValue());
    }
}