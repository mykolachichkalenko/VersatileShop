package com.example.backend.Services.ReviewServices.ProductReviewServices;

import com.example.backend.Services.RedisServices.AverageRatingAndReviewsCountCacheService;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class DeleteProductReviewService {

    private final DatabaseClient databaseClient;
    private final AverageRatingAndReviewsCountCacheService averageRatingAndReviewsCountCacheService;

    public DeleteProductReviewService(DatabaseClient databaseClient, AverageRatingAndReviewsCountCacheService averageRatingAndReviewsCountCacheService) {
        this.databaseClient = databaseClient;
        this.averageRatingAndReviewsCountCacheService = averageRatingAndReviewsCountCacheService;
    }

    public Mono<Boolean> deleteReview(String email, Long productId) {
        String sql = """
                DELETE FROM product_reviews 
                WHERE user_id = (SELECT id FROM users WHERE email = :email)
                AND product_id = :product_id
                """;

        return databaseClient.sql(sql)
                .bind("email", email)
                .bind("product_id", productId)
                .fetch()
                .rowsUpdated()
                .map(rows -> rows > 0)
                .flatMap(b -> averageRatingAndReviewsCountCacheService.deleteCache(productId)
                        .thenReturn(b));
    }
}
