package com.example.backend.Services.RedisServices;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserGetIDByEmailCache {
    private final ReactiveRedisTemplate<String,String> redisTemplate;

    public UserGetIDByEmailCache(@Qualifier("reactiveRedisTemplate") ReactiveRedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public Mono<Long> getValue(String email){
        String key = "user_id:" + email;
        return redisTemplate.opsForValue().get(key)
                .map(Long::valueOf);
    }

    public Mono<Boolean> setValue(String email, Long id) {
        String key = "user_id:" + email;
        return redisTemplate.opsForValue().set(key, String.valueOf(id));
    }


}
