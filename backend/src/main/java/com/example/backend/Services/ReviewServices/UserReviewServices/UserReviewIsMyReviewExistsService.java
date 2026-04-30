package com.example.backend.Services.ReviewServices.UserReviewServices;

import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserReviewIsMyReviewExistsService {
    private final DatabaseClient databaseClient;

    public UserReviewIsMyReviewExistsService(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }


    public Mono<Boolean> isMyReviewExists(String myEmail, String userEmail) {
        if(myEmail.equals(userEmail)) {
            return Mono.just(true);
        }

        String sql = """
                SELECT EXISTS (
                    SELECT 1
                    FROM user_reviews
                    WHERE reviewer_id = (SELECT id FROM users WHERE email = :myEmail) 
                      AND reviewed_user_id = (SELECT id FROM users WHERE email = :userEmail)
                ) AS has_exists;
                """;

        return databaseClient.sql(sql)
                .bind("myEmail", myEmail)
                .bind("userEmail", userEmail)
                .map(row -> row.get("has_exists", Boolean.class))
                .one();
    }
}
