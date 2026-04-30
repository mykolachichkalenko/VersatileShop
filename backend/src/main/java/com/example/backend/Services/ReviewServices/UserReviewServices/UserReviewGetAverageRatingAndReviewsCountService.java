package com.example.backend.Services.ReviewServices.UserReviewServices;

import com.example.backend.DTOs.AverageRatingAndReviewsCount;
import com.example.backend.Services.RedisServices.UserRatingReviewsCache;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserReviewGetAverageRatingAndReviewsCountService {
    private final DatabaseClient databaseClient;
    private final UserRatingReviewsCache userRatingReviewsCache;

    public UserReviewGetAverageRatingAndReviewsCountService(DatabaseClient databaseClient, UserRatingReviewsCache userRatingReviewsCache) {
        this.databaseClient = databaseClient;
        this.userRatingReviewsCache = userRatingReviewsCache;
    }


    public Mono<AverageRatingAndReviewsCount> getAverageRatingAndReviewsCount(String email) {
        String sql = """
                        SELECT
                          COALESCE(ROUND(AVG(rating)::numeric, 1), 0)::float8 AS average_rating,
                          COUNT(*) AS reviews_count
                         FROM user_reviews
                           WHERE reviewed_user_id = (SELECT id FROM users WHERE email = :email);
                """;

        return userRatingReviewsCache.getCache(email)
                .switchIfEmpty(
                        databaseClient.sql(sql)
                                .bind("email", email)
                                .map((row, meta) -> {
                                    AverageRatingAndReviewsCount result = new AverageRatingAndReviewsCount();
                                    result.setAverageRating(row.get("average_rating", Double.class));
                                    result.setReviewsCount(row.get("reviews_count", Integer.class));
                                    return result;
                                })
                                .one()
                                .flatMap(data -> userRatingReviewsCache.setCache(email, data)
                                        .thenReturn(data))
                );

    }
}
