package com.example.backend.Services.JSONConverterServices;

import com.example.backend.DTOs.KafkaProductCreateAIDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class KafkaCreateProductAIJSONConverter {
    private static final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule());

    public Mono<String> toJSON(KafkaProductCreateAIDTO data){
        return Mono.fromCallable(() -> objectMapper.writeValueAsString(data));
    }

        public Mono<KafkaProductCreateAIDTO> fromJSON(String json){
            return Mono.fromCallable(() -> objectMapper.readValue(json, KafkaProductCreateAIDTO.class));
        }
}
