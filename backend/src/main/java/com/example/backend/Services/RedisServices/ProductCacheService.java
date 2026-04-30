package com.example.backend.Services.RedisServices;

import com.example.backend.DTOs.ProductResponse;
import com.example.backend.Services.JSONConverterServices.ProductJSONConverter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Service
public class ProductCacheService {
    private final ReactiveRedisTemplate<String, String> redisTemplate;
    private final ProductJSONConverter productJSONConverter;

    public ProductCacheService(@Qualifier("reactiveRedisTemplate") ReactiveRedisTemplate<String, String> redisTemplate, ProductJSONConverter productJSONConverter) {
        this.redisTemplate = redisTemplate;
        this.productJSONConverter = productJSONConverter;
    }

    public Mono<Boolean> setValue(Long id,ProductResponse product){
        String key = "product:"+ id;
        return productJSONConverter.toJSON(product)
                .flatMap(json ->
                        redisTemplate.opsForValue().set(key,json, Duration.ofHours(1))
                        );
    }

    public Mono<ProductResponse> getValue(Long id){
        String key = "product:"+ id;
        return redisTemplate.opsForValue().get(key)
                .flatMap(productJSONConverter::fromJSON);
    }

    public Mono<Boolean> deleteValue(Long id){
        String key = "product:"+ id;
        return redisTemplate.opsForValue().delete(key);
    }
}
