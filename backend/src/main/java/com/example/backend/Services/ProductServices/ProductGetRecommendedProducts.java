package com.example.backend.Services.ProductServices;

import com.example.backend.DTOs.ProductResponse;
import com.example.backend.DTOs.RecommendedProductResponse;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class ProductGetRecommendedProducts {

    private final DatabaseClient databaseClient;

    public ProductGetRecommendedProducts(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    private final int LIMIT = 30;

    public Mono<RecommendedProductResponse> getRecommendedProducts(OAuth2User user, Long lastProductID, String isDefaultFinding, Integer offset, List<Long> ids) {
        String myEmail;
        if(user != null){
            myEmail = user.getAttribute("email");
        } else {
            myEmail = "null";
        }

        if (user == null || isDefaultFinding.equals("default")) {
            return getDefaultProducts(lastProductID,myEmail);
        }

        return getCurrentLikedProductID(offset, myEmail)
                .flatMap(id -> {
                    if (id == 0 && ids.isEmpty()) {
                        return getDefaultProducts(lastProductID,myEmail);
                    } else if (id == 0 && !ids.isEmpty()) {
                        return returnProductsResponse(List.of(), "no_more", offset);
                    }
                    return getSuitableProducts(id,ids,offset, myEmail);
                });
    }

    private Mono<RecommendedProductResponse> getDefaultProducts(Long lastProductID,String myEmail) {
        RecommendedProductResponse response = new RecommendedProductResponse();
        String sql = """
                    SELECT * FROM products
                                  WHERE (:lastProductID = 0 OR id < :lastProductID)
                                  AND owner_email != :myEmail
                                ORDER BY id DESC
                                LIMIT :limit
                
                """;
        return databaseClient.sql(sql)
                .bind("lastProductID", lastProductID)
                .bind("limit", LIMIT)
                .bind("myEmail", myEmail)
                .map((row, rowMetadata) -> {
                    ProductResponse pr = new ProductResponse();
                    pr.setId(row.get("id", Long.class));
                    pr.setTitle(row.get("title", String.class));
                    pr.setPrice(row.get("price", java.math.BigDecimal.class));
                    pr.setPhotoFirst(row.get("photo_1", String.class));
                    pr.setCondition(row.get("condition", String.class));

                    return pr;
                })
                .all()
                .collectList()
                .map(list -> {
                    response.setProducts(list);
                    response.setIsDefaultFinding("default");
                    response.setOffset(0);
                    return response;
                });
    }

    private Mono<Long> getCurrentLikedProductID(Integer offset, String email) {
        String sql = """
                SELECT product_id
                FROM likes
                WHERE user_email = :email
                ORDER BY id ASC
                LIMIT 1 OFFSET :offset;
                """;

        return databaseClient.sql(sql)
                .bind("email", email)
                .bind("offset", offset)
                .map((row, rowMetadata) -> row.get("product_id", Long.class))
                .one()
                .defaultIfEmpty(0L);
    }


    private Mono<RecommendedProductResponse> getSuitableProducts(Long id, List<Long> excludedIDs, Integer offset, String email) {
        String sql = """
                WITH seed AS (
                              SELECT vector
                              FROM products
                              WHERE id = :productID
                            )
                            SELECT p.id, p.owner_email, p.title, p.price, p.condition, p.photo_1,
                                   (p.vector <=> seed.vector) AS dist
                            FROM products p
                            CROSS JOIN seed
                            WHERE p.id <> :productID
                              AND NOT (p.id = ANY(CAST(:excludedIds AS bigint[])))
                              AND (p.vector <=> seed.vector) < :maxDistance
                            AND p.owner_email != :myEmail
                            ORDER BY dist ASC
                            LIMIT :limit;
                                            
                """;

        return databaseClient.sql(sql)
                .bind("productID", id)
                .bind("excludedIds", excludedIDs.toArray(new Long[0]))
                .bind("limit", LIMIT)
                .bind("maxDistance", 0.5)
                .bind("myEmail", email)
                .map((row, rowMetadata) -> {
                    ProductResponse pr = new ProductResponse();
                    pr.setId(row.get("id", Long.class));
                    pr.setOwnerEmail(row.get("owner_email", String.class));
                    pr.setTitle(row.get("title", String.class));
                    pr.setPrice(row.get("price", java.math.BigDecimal.class));
                    pr.setCondition(row.get("condition", String.class));
                    pr.setPhotoFirst(row.get("photo_1", String.class));
                    return pr;
                })
                .all()
                .collectList()
                .flatMap(list -> {
                    if (list.isEmpty()) {
                        return getCurrentLikedProductID(offset + 1, email)
                                .flatMap(nextId -> {
                                    if (nextId == 0) {
                                        return returnProductsResponse(List.of(), "no_more", offset + 1);
                                    }
                                    return getSuitableProducts(nextId, excludedIDs, offset + 1, email);
                                });
                    }
                    int finalOffset = offset;
                    if (list.size() != LIMIT) {
                        finalOffset = offset + 1;
                    }
                    return returnProductsResponse(list, "liked", finalOffset);
                });
    }

    private Mono<RecommendedProductResponse> returnProductsResponse(List<ProductResponse> products, String isDefaultFinding, Integer offset) {
        RecommendedProductResponse response = new RecommendedProductResponse();
        response.setProducts(products);
        response.setIsDefaultFinding(isDefaultFinding);
        response.setOffset(offset);
        return Mono.just(response);
    }
}
