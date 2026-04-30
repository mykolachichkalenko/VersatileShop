package com.example.backend.Services.ProductLikedService;

import com.example.backend.DTOs.ProductLikedInformation;
import com.example.backend.Services.RedisServices.UserStatusService;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ProductLikeServiceGetLikedProductInfo {
    private final DatabaseClient databaseClient;
    private final UserStatusService userStatusService;


    public ProductLikeServiceGetLikedProductInfo(DatabaseClient databaseClient, UserStatusService userStatusService) {
        this.databaseClient = databaseClient;
        this.userStatusService = userStatusService;
    }

    public Mono<ProductLikedInformation> getLikedProductInformation(String email, Long id) {
        String sql = """
                SELECT
                    p.id          AS id,
                    p.title       AS title,
                    p.description AS description,
                    p.price       AS price,
                    p.condition   AS condition,
                    p.status      AS status,
                    p.photo_1     AS photo_1,
                    p.photo_2     AS photo_2,
                    p.photo_3     AS photo_3,
                    p.created_at  AS created_at,
                
                    u.email        AS owner_email,
                    u.name         AS owner_name,
                    u.avatar_url   AS owner_profile_photo,
                
                    l.id           AS likedID
                
                FROM products p
                
                JOIN users u
                    ON u.email = p.owner_email
                
                LEFT JOIN likes l
                    ON l.product_id = p.id
                   AND l.user_email = :email
                
                WHERE p.id = :id;
                
                """;

        return databaseClient.sql(sql)
                .bind("email", email)
                .bind("id", id)
                .map(((row, rowMetadata) -> {
                    ProductLikedInformation productLikedInformation = new ProductLikedInformation();
                    productLikedInformation.setId(row.get("id", Long.class));
                    productLikedInformation.setTitle(row.get("title", String.class));
                    productLikedInformation.setDescription(row.get("description", String.class));
                    productLikedInformation.setPrice(row.get("price", java.math.BigDecimal.class));
                    productLikedInformation.setCondition(row.get("condition", String.class));
                    productLikedInformation.setStatus(row.get("status", String.class));
                    productLikedInformation.setPhotoFirst(row.get("photo_1", String.class));
                    productLikedInformation.setPhotoSecond(row.get("photo_2", String.class));
                    productLikedInformation.setPhotoThird(row.get("photo_3", String.class));
                    productLikedInformation.setCreatedAt(row.get("created_at", java.time.LocalDateTime.class));
                    productLikedInformation.setOwnerEmail(row.get("owner_email", String.class));
                    productLikedInformation.setOwnerName(row.get("owner_name", String.class));
                    productLikedInformation.setOwnerProfilePhoto(row.get("owner_profile_photo", String.class));
                    productLikedInformation.setLiked(row.get("likedID", Long.class) != null);

                    if (!email.equals("null")) {
                        productLikedInformation.setMyEmail(email);
                    }
                    return productLikedInformation;
                }))
                .one()
                .flatMap(p ->
                        userStatusService.getStatus(p.getOwnerEmail())
                                .map(status -> {
                                    p.setOwnerStatus(status);
                                    return p;
                                }))
                .defaultIfEmpty(new ProductLikedInformation(-1L));
    }
}
