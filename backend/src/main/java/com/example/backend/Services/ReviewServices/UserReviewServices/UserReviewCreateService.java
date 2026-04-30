package com.example.backend.Services.ReviewServices.UserReviewServices;

import com.example.backend.DTOs.UserReview;
import com.example.backend.Services.RedisServices.UserInfoCacheService;
import com.example.backend.Services.RedisServices.UserRatingReviewsCache;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserReviewCreateService {
    private final DatabaseClient databaseClient;
    private final UserRatingReviewsCache userRatingReviewsCache;
    private final UserInfoCacheService userInfoCacheService;

    public UserReviewCreateService(DatabaseClient databaseClient, UserRatingReviewsCache userRatingReviewsCache, UserInfoCacheService userInfoCacheService) {
        this.databaseClient = databaseClient;
        this.userRatingReviewsCache = userRatingReviewsCache;
        this.userInfoCacheService = userInfoCacheService;
    }

    public Mono<UserReview> createReview(String ownerEmail, String reviewedEmail, Integer rating, String comment) {
        String sql = """
                INSERT INTO user_reviews (reviewer_id, reviewed_user_id, rating, message)
                SELECT r.id, u.id, :rating, :message
                FROM users r
                JOIN users u ON u.email = :userEmail
                WHERE r.email = :myEmail;
                """;
        return databaseClient.sql(sql)
                .bind("myEmail", ownerEmail)
                .bind("userEmail", reviewedEmail)
                .bind("rating", rating)
                .bind("message", comment)
                .fetch()
                .rowsUpdated()
                .flatMap(r -> getReview(ownerEmail, reviewedEmail));
    }

    private Mono<UserReview> getReview(String ownerEmail, String reviewedEmail) {
        String sql = """
                SELECT
                  ur.id              AS id,
                  ow.name            AS owner_name,
                  ow.avatar_url      AS owner_avatar_url,
                  ow.email           AS owner_email,
                  ur.rating          AS rating,
                  ur.message         AS comment,
                  ur.created_at      AS created_at
                FROM user_reviews ur
                JOIN users ow       ON ow.id = ur.reviewer_id
                JOIN users reviewed ON reviewed.id = ur.reviewed_user_id
                WHERE ow.email = :ownerEmail
                  AND reviewed.email = :reviewedEmail
                LIMIT 1
                """;

        return databaseClient.sql(sql)
                .bind("ownerEmail", ownerEmail)
                .bind("reviewedEmail", reviewedEmail)
                .map((row, meta) -> {
                    UserReview r = new UserReview();
                    r.setId(row.get("id", Long.class));
                    r.setOwnerName(row.get("owner_name", String.class));
                    r.setOwnerAvatarUrl(row.get("owner_avatar_url", String.class));
                    r.setOwnerEmail(row.get("owner_email", String.class));
                    r.setRating(row.get("rating", Integer.class));
                    r.setComment(row.get("comment", String.class));
                    r.setCreatedAt(row.get("created_at", java.time.LocalDateTime.class));
                    return r;
                })
                .one()
                .flatMap(review -> userRatingReviewsCache.deleteCache(reviewedEmail)
                        .flatMap(r -> userInfoCacheService.deleteValue(reviewedEmail).thenReturn(review))
                );
    }
}
