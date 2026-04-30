package com.example.backend.Services.RedisServices;

import com.example.backend.DTOs.UserInfo;
import com.example.backend.Services.JSONConverterServices.UserInfoJSONConverter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Service
public class UserInfoCacheService {
    private final UserInfoJSONConverter userInfoJSONConverter;
    private final ReactiveRedisTemplate<String, String> redisTemplate;

    public UserInfoCacheService(UserInfoJSONConverter userInfoJSONConverter, @Qualifier("reactiveRedisTemplate") ReactiveRedisTemplate<String, String> redisTemplate) {
        this.userInfoJSONConverter = userInfoJSONConverter;
        this.redisTemplate = redisTemplate;
    }


    public Mono<Boolean> setValue(String email, UserInfo user) {
        String key = "userInfo:" + email;
        return userInfoJSONConverter.convertToJSON(user).flatMap(json -> redisTemplate.opsForValue().set(key, json, Duration.ofMinutes(5)));
    }

    public Mono<UserInfo> getValue(String email) {
        String key = "userInfo:" + email;
        return redisTemplate.opsForValue().get(key)
                .flatMap(userInfoJSONConverter::convertFromJSON);
    }

    public Mono<Boolean> deleteValue(String email) {
        String key = "userInfo:" + email;
        return redisTemplate.opsForValue().delete(key);
    }
}
