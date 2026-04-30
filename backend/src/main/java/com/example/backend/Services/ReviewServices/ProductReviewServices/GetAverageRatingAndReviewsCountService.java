package com.example.backend.Services.ReviewServices.ProductReviewServices;

import com.example.backend.DTOs.AverageRatingAndReviewsCount;
import com.example.backend.Services.RedisServices.AverageRatingAndReviewsCountCacheService;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class GetAverageRatingAndReviewsCountService {

    private final DatabaseClient databaseClient;
    private final AverageRatingAndReviewsCountCacheService averageRatingAndReviewsCountCacheService;

    public GetAverageRatingAndReviewsCountService(DatabaseClient databaseClient, AverageRatingAndReviewsCountCacheService averageRatingAndReviewsCountCacheService) {
        this.databaseClient = databaseClient;
        this.averageRatingAndReviewsCountCacheService = averageRatingAndReviewsCountCacheService;
    }

    public Mono<AverageRatingAndReviewsCount> getAverageRatingAndReviewsCountByID(Long productID) {

        String sql = """
                SELECT
                  COALESCE(ROUND(AVG(rating)::numeric, 1)::double precision, 0) AS average_rating,
                  COUNT(*) AS reviews_count
                FROM product_reviews
                WHERE product_id = :productId;
                """;

        return averageRatingAndReviewsCountCacheService.getCache(productID)
                .switchIfEmpty(Mono.defer(() ->
                        databaseClient.sql(sql)
                                .bind("productId", productID)
                                .map((row, metadata) -> {
                                    AverageRatingAndReviewsCount result = new AverageRatingAndReviewsCount();
                                    result.setAverageRating(row.get("average_rating", Double.class));
                                    result.setReviewsCount(row.get("reviews_count", Integer.class));
                                    return result;
                                })
                                .one()
                                .flatMap(data -> averageRatingAndReviewsCountCacheService.setCache(productID, data)
                                        .thenReturn(data))
                ));
    }

}