package com.example.backend.Services.RedisServices;

import com.example.backend.DTOs.ChatShardAndID;
import com.example.backend.Services.JSONConverterServices.ChatShardAndIDJSONConverter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ChatShardAndIDGetCache {
    private final ReactiveRedisTemplate<String, String> redisTemplate;
    private final ChatShardAndIDJSONConverter chatShardAndIDJSONConverter;

    public ChatShardAndIDGetCache(@Qualifier("reactiveRedisTemplate") ReactiveRedisTemplate<String, String> redisTemplate, ChatShardAndIDJSONConverter chatShardAndIDJSONConverter) {
        this.redisTemplate = redisTemplate;
        this.chatShardAndIDJSONConverter = chatShardAndIDJSONConverter;
    }

    public Mono<Boolean> setCache(Long userId1, Long userId2, ChatShardAndID value) {
        String key = "chatShardAndID:" + userId1 + ":" + userId2;

        return chatShardAndIDJSONConverter.toJSON(value)
                .flatMap(json -> redisTemplate.opsForValue().set(key, json));
    }


    public Mono<ChatShardAndID> getCache(Long userId1, Long userId2) {
        String key = "chatShardAndID:" + userId1 + ":" + userId2;

        return redisTemplate.opsForValue().get(key)
                .switchIfEmpty(Mono.defer(() -> {
                    String reverseKey = "chatShardAndID:" + userId2 + ":" + userId1;
                    return redisTemplate.opsForValue().get(reverseKey);
                }))
                .flatMap(chatShardAndIDJSONConverter::fromJSON);
    }
}