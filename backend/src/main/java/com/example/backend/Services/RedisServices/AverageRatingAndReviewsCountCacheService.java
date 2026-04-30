package com.example.backend.Services.RedisServices;

import com.example.backend.DTOs.AverageRatingAndReviewsCount;
import com.example.backend.Services.JSONConverterServices.AverageRatingAndReviewsCountJSONConvertor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Service
public class AverageRatingAndReviewsCountCacheService {

    private final AverageRatingAndReviewsCountJSONConvertor jsonConvertor;
    private final ReactiveRedisTemplate<String,String> redisTemplate;

    public AverageRatingAndReviewsCountCacheService(@Qualifier("reactiveRedisTemplate") ReactiveRedisTemplate<String, String> redisTemplate, AverageRatingAndReviewsCountJSONConvertor jsonConvertor) {
        this.jsonConvertor = jsonConvertor;
        this.redisTemplate = redisTemplate;
    }

    public Mono<Void> setCache(Long productId, AverageRatingAndReviewsCount data){
        String key = "product_review_summary:"+productId;
        return jsonConvertor.toJSON(data)
                .flatMap(json -> redisTemplate.opsForValue().set(key, json, Duration.ofMinutes(100)))
                .then();
    }

    public Mono<AverageRatingAndReviewsCount> getCache(Long productId){
        String key = "product_review_summary:"+productId;
        return redisTemplate.opsForValue().get(key)
                .flatMap(jsonConvertor::fromJSON);
    }

    public Mono<Boolean> deleteCache(Long productId){
        String key = "product_review_summary:"+productId;
        return redisTemplate.opsForValue().delete(key);
    }
}
