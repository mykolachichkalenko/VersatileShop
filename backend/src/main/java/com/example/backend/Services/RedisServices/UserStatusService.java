package com.example.backend.Services.RedisServices;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Service
public class UserStatusService {
    private final ReactiveRedisTemplate<String,String> redisTemplate;

    public UserStatusService(@Qualifier("reactiveRedisTemplate") ReactiveRedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public Mono<Void> setStatus(String email){
        String key = "user:status:" + email;
        return redisTemplate.opsForValue().set(key, "online", Duration.ofMinutes(1)).then();
    }

    public Mono<String> getStatus(String email) {
        String key = "user:status:" + email;
        return redisTemplate.opsForValue().get(key)
                .defaultIfEmpty("offline");
    }
}