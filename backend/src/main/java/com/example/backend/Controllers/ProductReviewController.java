package com.example.backend.Controllers;

import com.example.backend.DTOs.AverageRatingAndReviewsCount;
import com.example.backend.DTOs.ProductReview;
import com.example.backend.Services.ReviewServices.ProductReviewServices.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api/product")
public class ProductReviewController {
    private final GetProductReviewService getProductReviewService;
    private final GetMyReviewExists getMyReviewExists;
    private final GetAverageRatingAndReviewsCountService getAverageRatingAndReviewsCountService;
    private final CreateProductReview createProductReview;
    private final DeleteProductReviewService deleteProductReviewService;

    public ProductReviewController(GetProductReviewService getProductReviewService, GetMyReviewExists getMyReviewExists, GetAverageRatingAndReviewsCountService getAverageRatingAndReviewsCountService, CreateProductReview createProductReview, DeleteProductReviewService deleteProductReviewService) {
        this.getProductReviewService = getProductReviewService;
        this.getMyReviewExists = getMyReviewExists;
        this.getAverageRatingAndReviewsCountService = getAverageRatingAndReviewsCountService;
        this.createProductReview = createProductReview;
        this.deleteProductReviewService = deleteProductReviewService;
    }

    @PostMapping("/reviews/{productId}")
    public Flux<ProductReview> getProductReviews(@PathVariable("productId") Long productId, @RequestBody Map map) {
        Integer minId = (Integer) map.get("minId");
        return getProductReviewService.getProductReviews(productId, Long.valueOf(minId));
    }

    @GetMapping("/reviews/my-review-exists/{productID}")
    public Mono<Boolean> isMyReviewExists(@AuthenticationPrincipal OAuth2User user, @PathVariable("productID") Long productId) {
        if (user == null) {
            return Mono.just(true);
        }
        String email = user.getAttribute("email");
        if (email == null) {
            return Mono.just(true);
        }

        return getMyReviewExists.myReviewExists(email, productId);
    }

    @GetMapping("/reviews/average-rating-and-reviews-count/{productId}")
    public Mono<AverageRatingAndReviewsCount> getAverageRatingAndReviewsCount(@PathVariable("productId") Long productId) {
        return getAverageRatingAndReviewsCountService.getAverageRatingAndReviewsCountByID(productId);
    }

    @PostMapping("/review/create")
    public Mono<ProductReview> createReview(@AuthenticationPrincipal OAuth2User user, @RequestBody Map<String, Object> reviewData) {
        String email = user.getAttribute("email");
        Long productId = Long.valueOf((Integer) reviewData.get("productId"));
        Integer rating = (Integer) reviewData.get("rating");
        String comment = (String) reviewData.get("comment");

        return createProductReview.createReview(email, productId, rating, comment);
    }

    @PostMapping("/review/delete")
    public Mono<Boolean> deleteReview(@AuthenticationPrincipal OAuth2User user, @RequestBody Map reviewData) {
        Long productId = Long.valueOf((Integer) reviewData.get("productId"));
        String email = user.getAttribute("email");
        return deleteProductReviewService.deleteReview(email, productId);
    }
}
