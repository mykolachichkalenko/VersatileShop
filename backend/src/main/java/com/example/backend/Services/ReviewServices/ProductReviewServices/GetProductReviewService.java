package com.example.backend.Services.ReviewServices.ProductReviewServices;

import com.example.backend.DTOs.ProductReview;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class GetProductReviewService {


    private final DatabaseClient databaseClient;

    public GetProductReviewService(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    private final Integer LIMIT = 30;
    public Flux<ProductReview> getProductReviews(Long productId, Long minId) {
        String sql = """
                    SELECT
                      r.id,
                      r.rating,
                      r.message,
                      r.created_at,
                      u.name       AS owner_name,
                      u.avatar_url AS owner_avatar_url,
                      u.email      AS owner_email
                    FROM product_reviews r
                    JOIN users u ON u.id = r.user_id
                    WHERE r.product_id = :productId
                      AND (:minId = 0 OR r.id < :minId)
                    ORDER BY r.id DESC
                    LIMIT :limit;
                """;

        return databaseClient.sql(sql)
                .bind("productId", productId)
                .bind("minId", minId)
                .bind("limit",LIMIT)
                .map(((row, rowMetadata) -> {
                    ProductReview productReview = new ProductReview();

                    productReview.setId(row.get("id", Long.class));
                    productReview.setRating(row.get("rating", Integer.class));
                    productReview.setComment(row.get("message", String.class));
                    productReview.setCreatedAt(row.get("created_at", java.time.LocalDateTime.class));
                    productReview.setOwnerName(row.get("owner_name", String.class));
                    productReview.setOwnerAvatarUrl(row.get("owner_avatar_url", String.class));
                    productReview.setOwnerEmail(row.get("owner_email", String.class));

                    return productReview;
                }))
                .all();
    }


    public Mono<ProductReview> getProductReviewByEmailAndProductId(String ownerEmail,Long productId){
        String sql = """
                 SELECT
                      r.id,
                      r.rating,
                      r.message,
                      r.created_at,
                      u.name       AS owner_name,
                      u.avatar_url AS owner_avatar_url,
                      u.email      AS owner_email
                    FROM product_reviews r
                    JOIN users u ON u.id = r.user_id
                    WHERE r.product_id = :productId
                      AND user_id = (SELECT id FROM users WHERE email = :ownerEmail)
                    LIMIT 1;
                """;

        return databaseClient.sql(sql)
                .bind("productId", productId)
                .bind("ownerEmail", ownerEmail)
                .map(((row, rowMetadata) -> {
                    ProductReview productReview = new ProductReview();

                    productReview.setId(row.get("id", Long.class));
                    productReview.setRating(row.get("rating", Integer.class));
                    productReview.setComment(row.get("message", String.class));
                    productReview.setCreatedAt(row.get("created_at", java.time.LocalDateTime.class));
                    productReview.setOwnerName(row.get("owner_name", String.class));
                    productReview.setOwnerAvatarUrl(row.get("owner_avatar_url", String.class));
                    productReview.setOwnerEmail(row.get("owner_email", String.class));

                    return productReview;
                }))
                .one();
    }
}
