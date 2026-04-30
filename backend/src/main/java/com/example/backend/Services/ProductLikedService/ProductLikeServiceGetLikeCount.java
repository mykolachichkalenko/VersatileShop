package com.example.backend.Services.ProductLikedService;

import com.example.backend.Services.RedisServices.LikedProductCountCacheService;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ProductLikeServiceGetLikeCount {

    private final DatabaseClient databaseClient;
    private final LikedProductCountCacheService likedProductCountCacheService;

    public ProductLikeServiceGetLikeCount(DatabaseClient databaseClient, LikedProductCountCacheService likedProductCountCacheService) {
        this.databaseClient = databaseClient;
        this.likedProductCountCacheService = likedProductCountCacheService;
    }


    public Mono<Integer> getCount(String email) {
        String sql = "SELECT COUNT(*) FROM likes WHERE user_email = :email";

        return likedProductCountCacheService.getValue(email)
                .switchIfEmpty(Mono.defer(() -> databaseClient.sql(sql)
                        .bind("email", email)
                        .map(row -> row.get(0, Long.class))
                        .one()
                        .map(Long::intValue)
                        .flatMap(count -> likedProductCountCacheService.setValue(email, count)
                                .thenReturn(count))));
    }
}
