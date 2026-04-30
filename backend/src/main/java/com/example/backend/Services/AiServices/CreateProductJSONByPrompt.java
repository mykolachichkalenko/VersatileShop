package com.example.backend.Services.AiServices;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class CreateProductJSONByPrompt {

    private final WebClient webClient = WebClient.create("https://api.openai.com/v1/responses");

    @Value("${openai.api.key}")
    private String apiKey;

    public Mono<String> getGptResponse(String prompt) {
        Map<String, Object> requestBody = Map.of(
                "model", "gpt-5-nano",
                "input", List.of(
                        Map.of("role", "user", "content", prompt)
                )
        );

        return webClient.post()
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    try {
                        List<Map<String, Object>> output = (List<Map<String, Object>>) response.get("output");
                        if (output != null) {
                            for (Map<String, Object> item : output) {
                                if ("message".equals(item.get("type"))) {
                                    List<Map<String, Object>> content = (List<Map<String, Object>>) item.get("content");
                                    if (content != null && !content.isEmpty()) {
                                        return (String) content.get(0).get("text");
                                    }
                                }
                            }
                        }
                        return "No content found";
                    } catch (Exception e) {
                        e.printStackTrace();
                        return "Error parsing response: " + e.getMessage();
                    }
                });
    }

}
