package com.example.backend.Services.RedisServices;

import com.example.backend.Services.JSONConverterServices.VectorJSONConverter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Service
public class EmbedTextCacheService {

private final ReactiveRedisTemplate<String,String> redisTemplate;
    private final VectorJSONConverter vectorJSONConverter;

    public EmbedTextCacheService(@Qualifier("reactiveRedisTemplate") ReactiveRedisTemplate<String, String> redisTemplate, VectorJSONConverter vectorJSONConverter) {
        this.redisTemplate = redisTemplate;
        this.vectorJSONConverter = vectorJSONConverter;
    }


    public Mono<Void> setCache(String text, Double[] vector) {
        String key = "embed_text:" + text.trim();

        return vectorJSONConverter.toJSON(vector)
                .flatMap(json -> redisTemplate.opsForValue().set(key, json, Duration.ofHours(3)))
                .then();
    }


    public Mono<Double[]> getCache(String text){
        String key = "embed_text:"+text.trim();
        return redisTemplate.opsForValue().get(key)
                .flatMap(vectorJSONConverter::fromJSON);
    }

}
