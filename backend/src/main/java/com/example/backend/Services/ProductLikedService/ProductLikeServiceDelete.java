package com.example.backend.Services.ProductLikedService;

import com.example.backend.Services.RedisServices.LikedProductCountCacheService;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ProductLikeServiceDelete {
    private final DatabaseClient databaseClient;
    private final LikedProductCountCacheService likedProductCountCacheService;

    public ProductLikeServiceDelete(DatabaseClient databaseClient, LikedProductCountCacheService likedProductCountCacheService) {
        this.databaseClient = databaseClient;
        this.likedProductCountCacheService = likedProductCountCacheService;
    }

    public Mono<Boolean> deleteLikedProduct(String email, Long productId) {
        String sql = "DELETE FROM likes WHERE user_email = :email AND product_id = :productId";

        return databaseClient.sql(sql)
                .bind("email", email)
                .bind("productId", productId)
                .fetch()
                .rowsUpdated()
                .map(rows -> rows > 0)
                .flatMap(res -> likedProductCountCacheService.deleteValue(email)
                        .thenReturn(res));
    }
}
