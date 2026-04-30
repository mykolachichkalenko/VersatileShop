package com.example.backend.Services.ProductLikedService;

import com.example.backend.DTOs.ProductResponse;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class ProductLikeServiceGetFavoriteProducts {
    private final DatabaseClient databaseClient;

    public ProductLikeServiceGetFavoriteProducts(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    public Flux<ProductResponse> getFavoriteProducts(Long lastID, String myEmail) {

        if (lastID == 0) {
            String sql = """
                    SELECT 
                                    p.id,
                                    p.owner_email,
                                    p.title,
                                    p.price,
                                    p.condition,
                                    p.photo_1
                    FROM likes l
                    JOIN products p ON p.id = l.product_id
                    WHERE l.user_email = :email
                    ORDER BY l.product_id DESC
                    LIMIT 30;
                    """;

            return databaseClient.sql(sql)
                    .bind("email", myEmail)
                    .map(((row, rowMetadata) -> {
                        ProductResponse productResponse = new ProductResponse();

                        productResponse.setId(row.get("id", Long.class));
                        productResponse.setOwnerEmail(row.get("owner_email", String.class));
                        productResponse.setTitle(row.get("title", String.class));
                        productResponse.setPrice(row.get("price", java.math.BigDecimal.class));
                        productResponse.setCondition(row.get("condition", String.class));
                        productResponse.setPhotoFirst(row.get("photo_1", String.class));
                        return productResponse;
                    }))
                    .all();
        }

        String sqlIfIDNotNull = """
                 SELECT 
                                    p.id,
                                    p.owner_email,
                                    p.title,
                                    p.price,
                                    p.condition,
                                    p.photo_1
                FROM likes l
                JOIN products p ON p.id = l.product_id
                WHERE l.user_email = :email
                  AND l.product_id < :minID
                ORDER BY l.product_id DESC
                LIMIT 30;
                """;

        return databaseClient.sql(sqlIfIDNotNull)
                .bind("email", myEmail)
                .bind("minID", lastID)
                .map(((row, rowMetadata) -> {
                    ProductResponse productResponse = new ProductResponse();

                    productResponse.setId(row.get("id", Long.class));
                    productResponse.setOwnerEmail(row.get("owner_email", String.class));
                    productResponse.setTitle(row.get("title", String.class));
                    productResponse.setPrice(row.get("price", java.math.BigDecimal.class));
                    productResponse.setCondition(row.get("condition", String.class));
                    productResponse.setPhotoFirst(row.get("photo_1", String.class));
                    return productResponse;
                }))
                .all();
    }
}
