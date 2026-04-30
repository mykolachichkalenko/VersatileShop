package com.example.backend.Services.RedisServices;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserGetEmailByIDCache {
    private final ReactiveRedisTemplate<String,String> redisTemplate;

    public UserGetEmailByIDCache(@Qualifier("reactiveRedisTemplate") ReactiveRedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }


    public Mono<String> getEmail(Long id){
        String key = "user_email:" + id;
        return redisTemplate.opsForValue().get(key);
    }

        public Mono<Boolean> setEmail(Long id, String email) {
            String key = "user_email:" + id;
            return redisTemplate.opsForValue().set(key, email);
        }
}
