package com.example.backend.Services.RedisServices;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Service
public class LikedProductCountCacheService {
    private final ReactiveRedisTemplate<String,String> redisTemplate;

    public LikedProductCountCacheService(@Qualifier("reactiveRedisTemplate") ReactiveRedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }


    public Mono<Boolean> setValue(String email,int count){
        String key = "products:liked:count:"+email;
        return redisTemplate.opsForValue().set(key, String.valueOf(count), Duration.ofHours(4));
    }

    public Mono<Integer> getValue(String email){
        String key = "products:liked:count:"+email;
        return redisTemplate.opsForValue().get(key)
                .map(Integer::parseInt);
    }

    public Mono<Boolean> deleteValue(String email){
        String key = "products:liked:count:"+email;
        return redisTemplate.opsForValue().delete(key);
    }

}
