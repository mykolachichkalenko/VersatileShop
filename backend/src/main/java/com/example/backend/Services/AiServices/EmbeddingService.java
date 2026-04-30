package com.example.backend.Services.AiServices;

import com.example.backend.Services.RedisServices.EmbedTextCacheService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class EmbeddingService {
    private final WebClient webClient;
    private final EmbedTextCacheService embedTextCacheService;

    public EmbeddingService(@Value("${openai.api.key}") String apiKey, EmbedTextCacheService embedTextCacheService) {
        this.webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
        this.embedTextCacheService = embedTextCacheService;
    }

    public Mono<Double[]> embedText(String text) {
        Map<String, Object> requestBody = Map.of(
                "model", "text-embedding-3-small",
                "input", List.of(text)
        );

        return webClient.post()
                .uri("/embeddings")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    List<Map<String, Object>> data = (List<Map<String, Object>>) response.get("data");
                    List<Double> embeddingList = (List<Double>) data.get(0).get("embedding");
                    return embeddingList.toArray(new Double[0]);
                });
    }

    public Mono<Double[]> embedTextWithCache(String text) {
        return embedTextCacheService.getCache(text)
                .switchIfEmpty(Mono.defer(() -> embedText(text)
                        .flatMap(embedding -> embedTextCacheService.setCache(text, embedding)
                                .thenReturn(embedding))
                ));
    }
}
