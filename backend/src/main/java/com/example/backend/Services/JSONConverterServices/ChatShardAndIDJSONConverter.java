package com.example.backend.Services.JSONConverterServices;

import com.example.backend.DTOs.ChatShardAndID;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ChatShardAndIDJSONConverter {
    private static final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    public Mono<String> toJSON(ChatShardAndID obj) {
        return Mono.fromCallable(() -> objectMapper.writeValueAsString(obj));
    }

    public Mono<ChatShardAndID> fromJSON(String json) {
        return Mono.fromCallable(() -> objectMapper.readValue(json, ChatShardAndID.class));
    }
}