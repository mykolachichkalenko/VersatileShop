package com.example.backend.Services.JSONConverterServices;

import com.example.backend.DTOs.ProductAIForm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ProductAIFormJSONConverter {
    private static final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule());

    public Mono<String> toJSON(Object data) {
        return  Mono.fromCallable(() -> objectMapper.writeValueAsString(data));
    }

    public Mono<ProductAIForm> fromJSON(String json) {
        return Mono.fromCallable(() -> objectMapper.readValue(json, ProductAIForm.class));
    }
}
