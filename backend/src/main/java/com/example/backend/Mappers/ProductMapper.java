package com.example.backend.Mappers;

import com.example.backend.DTOs.CreateProductForm;
import com.example.backend.DTOs.ProductEntity;
import com.example.backend.DTOs.ProductResponse;
import com.example.backend.Services.AiServices.EmbeddingService;
import com.example.backend.Services.CloudinaryServices.CloudinaryImageService;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ProductMapper {
    private final CloudinaryImageService cloudinaryImageService;
    private final EmbeddingService embeddingService;

    public ProductMapper(CloudinaryImageService cloudinaryImageService, EmbeddingService embeddingService) {
        this.cloudinaryImageService = cloudinaryImageService;
        this.embeddingService = embeddingService;
    }

    public Mono<ProductEntity> toProductEntity(CreateProductForm product, String ownerEmail) {
        ProductEntity pr = new ProductEntity();
        pr.setTitle(product.getTitle());
        pr.setDescription(product.getDescription());
        pr.setPrice(product.getPrice());
        pr.setCondition(product.getCondition());
        pr.setStatus("active");
        pr.setOwnerEmail(ownerEmail);

        return cloudinaryImageService.getURLImage(product.getPhotoFirst())
                .map(urlFirst -> {
                    pr.setPhotoFirst(urlFirst);
                    return pr;
                })
                .flatMap(p -> {
                    if (product.getPhotoSecond() == null) return Mono.just(p);

                    return cloudinaryImageService.getURLImage(product.getPhotoSecond())
                            .map(urlSecond -> {
                                p.setPhotoSecond(urlSecond);
                                return p;
                            });
                })
                .flatMap(p -> {
                    if (product.getPhotoThird() == null) return Mono.just(p);

                    return cloudinaryImageService.getURLImage(product.getPhotoThird())
                            .map(urlThird -> {
                                p.setPhotoThird(urlThird);
                                return p;
                            });
                })
                .flatMap(p -> embeddingService.embedText(p.getDescription())
                        .map(vector -> {
                            p.setVector(vector);
                            return p;
                        }));
    }

}
