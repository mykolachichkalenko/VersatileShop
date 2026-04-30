package com.example.backend.Services.JSONConverterServices;

import com.example.backend.DTOs.ProductResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ProductJSONConverter {
    private static final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    public Mono<String> toJSON(ProductResponse product){
        return Mono.fromCallable(() -> objectMapper.writeValueAsString(product));
    }

    public Mono<ProductResponse> fromJSON(String json){
        return Mono.fromCallable(() -> objectMapper.readValue(json,ProductResponse.class));
    }

}
