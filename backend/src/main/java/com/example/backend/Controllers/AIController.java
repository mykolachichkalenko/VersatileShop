package com.example.backend.Controllers;

import com.example.backend.DTOs.KafkaProductCreateAIDTO;
import com.example.backend.Services.JSONConverterServices.KafkaCreateProductAIJSONConverter;
import com.example.backend.Services.KafkaServices.KafkaProducerAIService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {


    private final KafkaProducerAIService kafkaProducerAIService;
    private final KafkaCreateProductAIJSONConverter kafkaCreateProductAIJSONConverter;

    public AIController(KafkaProducerAIService kafkaProducerAIService, KafkaCreateProductAIJSONConverter kafkaCreateProductAIJSONConverter) {
        this.kafkaProducerAIService = kafkaProducerAIService;
        this.kafkaCreateProductAIJSONConverter = kafkaCreateProductAIJSONConverter;
    }

    @PostMapping("/create/product")
    public Mono<Void> createProduct(@RequestBody Map map, @AuthenticationPrincipal OAuth2User user) {
        String description = (String) map.get("description");
        String email = user.getAttribute("email");

        KafkaProductCreateAIDTO dto = new KafkaProductCreateAIDTO();
        dto.setDescription(description);
        dto.setEmail(email);

        return kafkaCreateProductAIJSONConverter.toJSON(dto)
                .flatMap(kafkaProducerAIService::send);
    }
}
