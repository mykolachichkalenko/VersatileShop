package com.example.backend.Services.ReviewServices.ProductReviewServices;

import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class GetMyReviewExists {

    private final DatabaseClient databaseClient;

    public GetMyReviewExists(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    public Mono<Boolean> myReviewExists(String email, Long productId) {
        String sql = """
                SELECT EXISTS (
                  SELECT 1
                  FROM product_reviews
                  WHERE user_id = (SELECT id FROM users WHERE email = :email)
                    AND product_id = :productId
                ) AS exists;
                """;

        return databaseClient.sql(sql)
                .bind("email", email)
                .bind("productId", productId)
                .map((row, meta) -> row.get("exists", Boolean.class))
                .one()
                .flatMap(exists -> {
                    if (exists) {
                        return Mono.just(true);
                    }

                    return getOwnerEmail(productId)
                            .flatMap(ownerEmail -> {
                                if (ownerEmail.equals(email)) {
                                    return Mono.just(true);
                                }
                                return Mono.just(false);
                            });
                });
    }

    private Mono<String> getOwnerEmail(Long productId) {
        String sqlGetOwnerEmail = """
                SELECT owner_email FROM products WHERE id = :productId
                """;
        return databaseClient.sql(sqlGetOwnerEmail)
                .bind("productId", productId)
                .map((row, meta) -> row.get("owner_email", String.class))
                .one();
    }
}
