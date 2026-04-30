package com.example.backend.Services.ReviewServices.UserReviewServices;

import com.example.backend.Services.RedisServices.UserInfoCacheService;
import com.example.backend.Services.RedisServices.UserRatingReviewsCache;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserReviewDeleteService {
    private final DatabaseClient databaseClient;
    private final UserRatingReviewsCache userRatingReviewsCache;
    private final UserInfoCacheService userInfoCacheService;

    public UserReviewDeleteService(DatabaseClient databaseClient, UserRatingReviewsCache userRatingReviewsCache, UserInfoCacheService userInfoCacheService) {
        this.databaseClient = databaseClient;
        this.userRatingReviewsCache = userRatingReviewsCache;
        this.userInfoCacheService = userInfoCacheService;
    }

    public Mono<Boolean> deleteReview(String myEmail, Long reviewId, String userEmail) {
        return databaseClient.sql("""
                            DELETE FROM user_reviews
                            WHERE id = :id
                              AND reviewer_id = (SELECT id FROM users WHERE email = :email)
                        """)
                .bind("id", reviewId)
                .bind("email", myEmail)
                .fetch()
                .rowsUpdated()
                .map(rows -> rows > 0)
                .flatMap(res -> userRatingReviewsCache.deleteCache(userEmail)
                        .flatMap(b -> userInfoCacheService.deleteValue(userEmail))
                        .thenReturn(res));
    }
}
