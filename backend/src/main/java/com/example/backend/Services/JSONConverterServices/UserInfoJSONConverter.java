package com.example.backend.Services.JSONConverterServices;

import com.example.backend.DTOs.UserInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserInfoJSONConverter {
    private static final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    public Mono<String> convertToJSON(UserInfo user){
        return Mono.fromCallable(() -> objectMapper.writeValueAsString(user));
    }

    public Mono<UserInfo> convertFromJSON(String json){
        return Mono.fromCallable(() -> objectMapper.readValue(json, UserInfo.class));
    }
}
