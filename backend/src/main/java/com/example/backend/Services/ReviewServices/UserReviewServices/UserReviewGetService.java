package com.example.backend.Services.ReviewServices.UserReviewServices;

import com.example.backend.DTOs.UserReview;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class UserReviewGetService {
    private final DatabaseClient databaseClient;

    public UserReviewGetService(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }


    public Flux<UserReview> getReview(String userEmail, Long minId) {

        String sql = """
                SELECT
                  ur.id                 AS id,
                  ow.name               AS owner_name,
                  ow.avatar_url         AS owner_avatar_url,
                  ow.email              AS owner_email,
                  ur.rating             AS rating,
                  ur.message            AS comment,
                  ur.created_at         AS created_at
                FROM user_reviews ur
                JOIN users ow ON ow.id = ur.reviewer_id
                WHERE ur.reviewed_user_id = (SELECT id FROM users WHERE email = :userEmail)
                  AND (:minId = 0 OR ur.id < :minId)
                ORDER BY ur.id DESC
                LIMIT 30
                """;

        return databaseClient.sql(sql)
                .bind("userEmail", userEmail)
                .bind("minId",minId)
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
                .all();
    }
}
