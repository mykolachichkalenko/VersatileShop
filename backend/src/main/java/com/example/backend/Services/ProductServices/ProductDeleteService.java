package com.example.backend.Services.ProductServices;

import com.example.backend.Services.RedisServices.ProductCacheService;
import com.example.backend.Services.RedisServices.ProductCountCacheService;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ProductDeleteService {

    private final DatabaseClient databaseClient;
    private final ProductCacheService productCacheService;
    private final ProductCountCacheService productCountCacheService;

    public ProductDeleteService(DatabaseClient databaseClient, ProductCacheService productCacheService, ProductCountCacheService productCountCacheService) {
        this.databaseClient = databaseClient;
        this.productCacheService = productCacheService;
        this.productCountCacheService = productCountCacheService;
    }

    public Mono<String> deleteProductBuID(Long id, String email) {
        String sql = "DELETE FROM products WHERE id = :id";

        return databaseClient.sql(sql)
                .bind("id", id)
                .fetch()
                .rowsUpdated()
                .flatMap(updated -> productCacheService.deleteValue(id)
                        .then(productCountCacheService.deleteValue(email))
                        .thenReturn(updated > 0 ? "PDS" : "PDE"));
    }
}
