package com.example.backend.Services.JSONConverterServices;

import com.example.backend.DTOs.Chat;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ChatJSONConverter {
    private static final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule());

    public Mono<String> toJSON(Chat chat){
        return Mono.fromCallable(() -> objectMapper.writeValueAsString(chat));
    }

        public Mono<Chat> fromJSON(String json){
            return Mono.fromCallable(() -> objectMapper.readValue(json, Chat.class));
        }
}
