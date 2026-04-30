package com.example.backend.Services.ProductLikedService;

import com.example.backend.Services.RedisServices.LikedProductCountCacheService;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ProductLikeServiceSetLiked {
    private final DatabaseClient databaseClient;
    private final LikedProductCountCacheService likedProductCountCacheService;

    public ProductLikeServiceSetLiked(DatabaseClient databaseClient, LikedProductCountCacheService likedProductCountCacheService) {
        this.databaseClient = databaseClient;
        this.likedProductCountCacheService = likedProductCountCacheService;
    }

    public Mono<Boolean> likeProduct(String email, Long productId) {
        String sql = "INSERT INTO likes(user_email, product_id) VALUES(:email, :productId) ON CONFLICT (user_email, product_id) DO NOTHING";

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
