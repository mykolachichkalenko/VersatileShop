package com.example.backend.Services.RedisServices;

import com.example.backend.DTOs.AverageRatingAndReviewsCount;
import com.example.backend.Services.JSONConverterServices.AverageRatingAndReviewsCountJSONConvertor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Service
public class UserRatingReviewsCache {

    private final ReactiveRedisTemplate<String, String> redisTemplate;
    private final AverageRatingAndReviewsCountJSONConvertor jsonConvertor;

    public UserRatingReviewsCache(@Qualifier("reactiveRedisTemplate") ReactiveRedisTemplate<String, String> redisTemplate, AverageRatingAndReviewsCountJSONConvertor jsonConvertor) {
        this.redisTemplate = redisTemplate;
        this.jsonConvertor = jsonConvertor;
    }


    public Mono<Void> setCache(String email, AverageRatingAndReviewsCount data) {
        String key = "user_reviews:" + email;
        return jsonConvertor.toJSON(data)
                .flatMap(json -> redisTemplate.opsForValue().set(key, json, Duration.ofMinutes(5)))
                .then();
    }


    public Mono<AverageRatingAndReviewsCount> getCache(String email) {
        String key = "user_reviews:" + email;
        return redisTemplate.opsForValue().get(key)
                .flatMap(jsonConvertor::fromJSON);
    }

    public Mono<Boolean> deleteCache(String email) {
        String key = "user_reviews:" + email;
        return redisTemplate.opsForValue().delete(key);
    }
}
