package com.example.backend.Services.RedisServices;

import com.example.backend.DTOs.UserProfile;
import com.example.backend.Services.JSONConverterServices.UserJSONConverter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Service
public class UserCacheService {
    private final ReactiveRedisTemplate<String, String> redisTemplate;
    private final UserJSONConverter userJSONConverter;

    public UserCacheService(@Qualifier("reactiveRedisTemplate") ReactiveRedisTemplate<String, String> redisTemplate, UserJSONConverter userJSONConverter) {
        this.redisTemplate = redisTemplate;
        this.userJSONConverter = userJSONConverter;
    }

    public Mono<Boolean> setValue(String email, UserProfile user){
        String key = "user:" + email;
        return userJSONConverter.toJSON(user)
                .flatMap(json ->
                        redisTemplate.opsForValue().set(key, json, Duration.ofHours(1))
                );
    }

    public Mono<UserProfile> getValue(String email){
        String key = "user:" + email;
        return redisTemplate.opsForValue().get(key)
                .flatMap(userJSONConverter::fromJSON);
    }

    public Mono<Boolean> deleteValue(String email){
        String key = "user:" + email;
        return redisTemplate.opsForValue().delete(key);
    }

}
