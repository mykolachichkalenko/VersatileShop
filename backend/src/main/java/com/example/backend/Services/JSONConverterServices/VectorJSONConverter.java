package com.example.backend.Services.JSONConverterServices;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class VectorJSONConverter {
    private static final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    public Mono<String> toJSON(Double[] vector){
        return Mono.fromCallable(() -> objectMapper.writeValueAsString(vector));
    }

    public Mono<Double[]> fromJSON(String json){
        return Mono.fromCallable(() -> objectMapper.readValue(json,Double[].class));
    }
}
