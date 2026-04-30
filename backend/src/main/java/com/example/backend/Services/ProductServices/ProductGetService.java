package com.example.backend.Services.ProductServices;

import com.example.backend.DTOs.ProductResponse;
import com.example.backend.DTOs.SearchFilters;
import com.example.backend.Services.RedisServices.ProductCacheService;
import com.example.backend.Services.RedisServices.ProductCountCacheService;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class ProductGetService {
    private final int LIMIT = 30;
    private final DatabaseClient databaseClient;
    private final ProductCacheService productCacheService;
    private final ProductCountCacheService productCountCacheService;

    public ProductGetService(DatabaseClient databaseClient, ProductCacheService productCacheService, ProductCountCacheService productCountCacheService) {
        this.databaseClient = databaseClient;
        this.productCacheService = productCacheService;
        this.productCountCacheService = productCountCacheService;
    }

    public Flux<ProductResponse> getProducts(int page, int lastProductId, String ownerEmail) {
        String sql = """
                    SELECT * FROM products
                                WHERE owner_email = :email
                                  AND (:lastProductID = 0 OR id < :lastProductID)
                                ORDER BY id DESC
                                LIMIT :limit
                
                """;

        return databaseClient.sql(sql)
                .bind("email", ownerEmail)
                .bind("lastProductID", lastProductId)
                .bind("limit", LIMIT)
                .map(row -> {
                    ProductResponse productResponse = new ProductResponse();

                    productResponse.setId(row.get("id", Long.class));
                    productResponse.setTitle(row.get("title", String.class));
                    productResponse.setDescription(row.get("description", String.class));
                    productResponse.setPrice(row.get("price", BigDecimal.class));
                    productResponse.setCondition(row.get("condition", String.class));
                    productResponse.setStatus(row.get("status", String.class));
                    productResponse.setCreatedAt(row.get("created_at", LocalDateTime.class));
                    productResponse.setPhotoFirst(row.get("photo_1", String.class));

                    return productResponse;
                }).all();
    }

    public Mono<ProductResponse> getProductByIdForEdit(Long id, String ownerEmail) {
        return getProductById(id)
                .flatMap(p -> {
                    if (p.getId() == -1L) {
                        return emptyProduct();
                    }
                    if (p.getOwnerEmail() != null && p.getOwnerEmail().equals(ownerEmail)) {
                        return Mono.just(p);
                    } else {
                        return emptyProduct();
                    }

                });
    }

    public Mono<ProductResponse> getProductById(Long id) {
        String sql = "SELECT * FROM products WHERE id = :id";

        return productCacheService.getValue(id)
                .switchIfEmpty(Mono.defer(() ->
                        databaseClient.sql(sql)
                                .bind("id", id)
                                .map((row, meta) -> {
                                    ProductResponse p = new ProductResponse();
                                    p.setId(row.get("id", Long.class));
                                    p.setTitle(row.get("title", String.class));
                                    p.setDescription(row.get("description", String.class));
                                    p.setPrice(row.get("price", BigDecimal.class));
                                    p.setCondition(row.get("condition", String.class));
                                    p.setPhotoFirst(row.get("photo_1", String.class));
                                    p.setPhotoSecond(row.get("photo_2", String.class));
                                    p.setPhotoThird(row.get("photo_3", String.class));
                                    p.setOwnerEmail(row.get("owner_email", String.class));
                                    return p;
                                })
                                .one()
                                .flatMap(p -> {
                                    String desc = p.getDescription();
                                    if (desc != null && !desc.isBlank()) {
                                        return productCacheService.setValue(id, p).thenReturn(p);
                                    }
                                    return Mono.just(p);
                                })
                                .defaultIfEmpty(new ProductResponse(-1L))
                ));
    }

    public Mono<Integer> getCountMyProduct(String email) {
        String sql = "SELECT COUNT(*) AS cnt FROM products WHERE owner_email = :email";

        return productCountCacheService.getValue(email)
                .switchIfEmpty(Mono.defer(() ->
                                databaseClient.sql(sql)
                                        .bind("email", email)
                                        .map((row, rowMetadata) -> Objects.requireNonNull(row.get("cnt", Long.class)).intValue())
                                        .one()
                                        .defaultIfEmpty(0)
                        ).flatMap(count -> productCountCacheService.setValue(email, count)
                                .thenReturn(count))
                );
    }

    private Mono<ProductResponse> emptyProduct() {
        return Mono.just(new ProductResponse(-1L));
    }

}
