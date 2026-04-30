package com.example.backend.Services.JSONConverterServices;

import com.example.backend.DTOs.Message;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class MessageJSONConverterService {
    private static final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule());

    public Mono<String> toJSON(Object obj) {
        return Mono.fromCallable(() -> objectMapper.writeValueAsString(obj));
    }

    public Mono<Message> fromJSON(String json) {
        return Mono.fromCallable(() -> objectMapper.readValue(json, Message.class));
    }
}
