package com.example.backend.Services.AiServices;

import com.example.backend.DTOs.ProductAIForm;
import com.example.backend.Services.JSONConverterServices.KafkaCreateProductAIJSONConverter;
import com.example.backend.Services.JSONConverterServices.ProductAIFormJSONConverter;
import com.example.backend.Services.RedisServices.ProductCountCacheService;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
public class CreateProductWithAI {

    private final KafkaCreateProductAIJSONConverter kafkaCreateProductAIJSONConverter;
    private final CreateProductJSONByPrompt createProductJSONByPrompt;
    private final ProductAIFormJSONConverter productAIFormJSONConverter;
    private final EmbeddingService embeddingService;
    private final DatabaseClient databaseClient;
    private final ProductCountCacheService productCountCacheService;

    public CreateProductWithAI(KafkaCreateProductAIJSONConverter kafkaCreateProductAIJSONConverter, CreateProductJSONByPrompt createProductJSONByPrompt, ProductAIFormJSONConverter productAIFormJSONConverter, EmbeddingService embeddingService, DatabaseClient databaseClient, ProductCountCacheService productCountCacheService) {
        this.kafkaCreateProductAIJSONConverter = kafkaCreateProductAIJSONConverter;
        this.createProductJSONByPrompt = createProductJSONByPrompt;
        this.productAIFormJSONConverter = productAIFormJSONConverter;
        this.embeddingService = embeddingService;
        this.databaseClient = databaseClient;
        this.productCountCacheService = productCountCacheService;
    }

    public Mono<Void> create(String json) {
        return kafkaCreateProductAIJSONConverter.fromJSON(json)
                .flatMap(data -> {
                    String prompt = getPrompt(data.getDescription());

                    return createProductJSONByPrompt.getGptResponse(prompt)
                            .flatMap(productJSON -> createProduct(productJSON, data.getEmail()));
                }).then();
    }


    private Mono<Void> createProduct(String json, String ownerEmail) {
        if (json == null || json.trim().equalsIgnoreCase("e") || json.trim().equals("е")) {
            return Mono.empty();
        }

        return productAIFormJSONConverter.fromJSON(json)
                .flatMap(product -> {
                    if (product.getTitle().length() > 94 || !Objects.equals(product.getCondition(), "new") && !Objects.equals(product.getCondition(), "used")) {
                        return Mono.empty();
                    }
                    return insertIntoDB(product, ownerEmail);
                })
                .onErrorResume(e -> {
                    System.out.println("Error parsing JSON: " + e.getMessage());
                    return Mono.empty();
                }).then();
    }

    private Mono<Void> insertIntoDB(ProductAIForm product, String ownerEmail) {
        String sql = "INSERT INTO products (owner_email,title,description,price,condition,status,vector,photo_1) VALUES(:ownerEmail,:title,:description,:price,:condition,:status,:vector,:photoFirst)";

        return embeddingService.embedText(product.getDescription())
                .flatMap(vector ->
                        databaseClient.sql(sql)
                                .bind("ownerEmail", ownerEmail)
                                .bind("title", product.getTitle())
                                .bind("description", product.getDescription())
                                .bind("price", product.getPrice())
                                .bind("condition", product.getCondition())
                                .bind("status", "active")
                                .bind("vector", vector)
                                .bind("photoFirst", product.getPhoto())
                                .fetch()
                                .rowsUpdated()
                                .then(productCountCacheService.deleteValue(ownerEmail))
                                .then());
    }

    private String getPrompt(String description) {
        return """
                You are a system that generates structured product data from a user description.
                
                   Your task:
                   Analyze the provided product description and generate a valid JSON object for a product.
                
                   STRICT RULES:
                
                   1. If the description is completely unclear, meaningless, or you cannot determine the product:
                      - Return ONLY one character: е
                
                   2. If the description is understandable:
                      - Return ONLY raw JSON (no explanations, no markdown, no code blocks)
                
                   3. JSON structure MUST be exactly:
                
                   {
                     "title": string,
                     "description": string,
                     "price": number,
                     "condition": string,
                     "photo": string
                   }
                
                   4. DATABASE CONSTRAINT RULES (CRITICAL):
                
                   - title:
                     - MUST NOT exceed 94 characters
                     - MUST be trimmed and clean
                     - If generated title is longer → intelligently shorten it
                
                   - description:
                     - MUST NOT be empty
                     - MUST be readable and useful
                
                   - price:
                     - MUST be a positive number (>= 0)
                     - MUST NOT include currency symbols
                
                   - condition:
                     - MUST be ONLY one of:
                       "new"
                       "used"
                     - If unknown → default to "used"
                
                   - photo:
                     - MUST be a valid URL string
                     - Use realistic placeholder if unknown:
                       https://source.unsplash.com/featured/?product
                
                   5. If some data is missing:
                      - Infer realistic approximate values
                
                   6. Language:
                      - Use the SAME language as input
                
                   7. HARD VALIDATION BEFORE RESPONSE:
                      - Ensure JSON is valid and parsable
                      - Ensure ALL constraints are satisfied
                
                   8. DO NOT:
                      - Add explanations
                      - Add markdown
                      - Wrap JSON in ``` blocks
                
                   9. OUTPUT:
                      - Return ONLY valid JSON OR the single character: е
                
                   Input:
                   ""
                """ + description + """
                   ""
                """;

    }
}