package com.example.backend.Services.ReviewServices.ProductReviewServices;

import com.example.backend.DTOs.ProductReview;
import com.example.backend.Services.RedisServices.AverageRatingAndReviewsCountCacheService;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class CreateProductReview {


    private final DatabaseClient databaseClient;
    private final GetProductReviewService getProductReviewService;
    private final AverageRatingAndReviewsCountCacheService averageRatingAndReviewsCountCacheService;

    public CreateProductReview(DatabaseClient databaseClient, GetProductReviewService getProductReviewService, AverageRatingAndReviewsCountCacheService averageRatingAndReviewsCountCacheService) {
        this.databaseClient = databaseClient;
        this.getProductReviewService = getProductReviewService;
        this.averageRatingAndReviewsCountCacheService = averageRatingAndReviewsCountCacheService;
    }

    public Mono<ProductReview> createReview(String email, Long productId, Integer rating, String comment) {
        String sql = """
                INSERT INTO product_reviews (user_id, product_id, rating, message)
                VALUES ((SELECT id FROM users WHERE email = :email), :productId, :rating, :comment);
                """;

        return databaseClient.sql(sql)
                .bind("email", email)
                .bind("productId", productId)
                .bind("rating", rating)
                .bind("comment", comment)
                .fetch()
                .rowsUpdated()
                .flatMap(r -> averageRatingAndReviewsCountCacheService.deleteCache(productId))
                .flatMap(r -> getProductReviewService.getProductReviewByEmailAndProductId(email, productId));
    }


}
