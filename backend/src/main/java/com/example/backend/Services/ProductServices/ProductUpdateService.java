package com.example.backend.Services.ProductServices;

import com.example.backend.DTOs.CreateProductForm;
import com.example.backend.Services.AiServices.EmbeddingService;
import com.example.backend.Services.CloudinaryServices.CloudinaryImageService;
import com.example.backend.Services.RedisServices.ProductCacheService;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class ProductUpdateService {


    private final CloudinaryImageService cloudinaryImageService;
    private final DatabaseClient databaseClient;
    private final EmbeddingService embeddingService;
    private final ProductCacheService productCacheService;

    public ProductUpdateService(CloudinaryImageService cloudinaryImageService, DatabaseClient databaseClient, EmbeddingService embeddingService, ProductCacheService productCacheService) {
        this.cloudinaryImageService = cloudinaryImageService;
        this.databaseClient = databaseClient;
        this.embeddingService = embeddingService;
        this.productCacheService = productCacheService;
    }

    public Mono<String> updateProduct(CreateProductForm product, String email, Long id) {
        return uploadPhotos(product)
                .flatMap(photoMap -> {
                    Map<String, Object> updates = new LinkedHashMap<>();

                    if (product.getTitle() != null && !product.getTitle().isBlank()) {
                        updates.put("title", product.getTitle());
                    }

                    if (product.getDescription() != null && !product.getDescription().isBlank()) {
                        updates.put("description", product.getDescription());
                    }

                    if (product.getPrice() != null) {
                        updates.put("price", product.getPrice());
                    }

                    if (product.getCondition() != null && !product.getCondition().isBlank()) {
                        updates.put("condition", product.getCondition());
                    }

                    photoMap.forEach(updates::put);

                    if (updates.isEmpty()) {
                        return Mono.just("PEE");
                    }

                    String setClause = updates.keySet().stream()
                            .map(col -> col + " = :" + col)
                            .collect(java.util.stream.Collectors.joining(", "));

                    String sql = "UPDATE products SET " + setClause + " WHERE id = :id AND owner_email = :email";

                    DatabaseClient.GenericExecuteSpec spec = databaseClient.sql(sql)
                            .bind("id", id)
                            .bind("email", email);

                    for (var e : updates.entrySet()) {
                        spec = spec.bind(e.getKey(), e.getValue());
                    }

                    return spec.fetch().rowsUpdated()
                            .flatMap(rows -> productCacheService.deleteValue(id)
                                    .thenReturn(rows > 0 ? "PES" : "PEE"));
                });
    }

    private Mono<Map<String, Object>> uploadPhotos(CreateProductForm form) {
        Mono<Map<String, Object>> m = Mono.just(new HashMap<>());

        if (form.getPhotoFirst() != null) {
            m = m.flatMap(map -> cloudinaryImageService.getURLImage(form.getPhotoFirst())
                    .map(url -> {
                        map.put("photo_1", url);
                        return map;
                    }));
        }
        if (form.getPhotoSecond() != null) {
            m = m.flatMap(map -> cloudinaryImageService.getURLImage(form.getPhotoSecond())
                    .map(url -> {
                        map.put("photo_2", url);
                        return map;
                    }));
        }
        if (form.getPhotoThird() != null) {
            m = m.flatMap(map -> cloudinaryImageService.getURLImage(form.getPhotoThird())
                    .map(url -> {
                        map.put("photo_3", url);
                        return map;
                    }));
        }

        if(form.getDescription() != null){
            m = m.flatMap( map -> embeddingService.embedText(form.getDescription())
                    .map(vector ->{
                        map.put("vector",vector);
                        return map;
                    }));
        }

        return m;
    }

}
