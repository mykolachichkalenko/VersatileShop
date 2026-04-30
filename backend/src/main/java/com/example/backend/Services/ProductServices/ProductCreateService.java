package com.example.backend.Services.ProductServices;

import com.example.backend.DTOs.CreateProductForm;
import com.example.backend.DTOs.ProductEntity;
import com.example.backend.Mappers.ProductMapper;
import com.example.backend.Services.RedisServices.ProductCountCacheService;
import com.nimbusds.openid.connect.sdk.assurance.evidences.Voucher;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ProductCreateService {
    private final ProductMapper productMapper;
    private final DatabaseClient databaseClient;
    private final ProductCountCacheService productCountCacheService;

    public ProductCreateService(ProductMapper productMapper, DatabaseClient databaseClient, ProductCountCacheService productCountCacheService) {
        this.productMapper = productMapper;
        this.databaseClient = databaseClient;
        this.productCountCacheService = productCountCacheService;
    }

    public Mono<Void> createProduct(CreateProductForm product, String ownerEmail) {

        return productMapper.toProductEntity(product, ownerEmail)
                .flatMap(p -> {
                    if (p.getPhotoThird() != null) {
                        return createWithThreePhotos(p);
                    } else if (p.getPhotoSecond() != null) {
                        return createWithTwoPhotos(p);
                    }
                    return createWithOnePhoto(p);
                })
                .then(productCountCacheService.deleteValue(ownerEmail))
                .then();
    }


    private Mono<Void> createWithThreePhotos(ProductEntity product) {
        String sql = "INSERT INTO products (owner_email,title,description,price,condition,status,vector,photo_1,photo_2, photo_3) VALUES(:ownerEmail,:title,:description,:price,:condition,:status,:vector,:photoFirst,:photoSecond,:photoThird)";

        return databaseClient.sql(sql)
                .bind("ownerEmail", product.getOwnerEmail())
                .bind("title", product.getTitle())
                .bind("description", product.getDescription())
                .bind("price", product.getPrice())
                .bind("condition", product.getCondition())
                .bind("status", product.getStatus())
                .bind("vector", product.getVector())
                .bind("photoFirst", product.getPhotoFirst())
                .bind("photoSecond", product.getPhotoSecond())
                .bind("photoThird", product.getPhotoThird())
                .fetch()
                .rowsUpdated()
                .then();
    }

    private Mono<Void> createWithTwoPhotos(ProductEntity product) {
        String sql = "INSERT INTO products (owner_email,title,description,price,condition,status,vector,photo_1,photo_2) VALUES(:ownerEmail,:title,:description,:price,:condition,:status,:vector,:photoFirst,:photoSecond)";

        return databaseClient.sql(sql)
                .bind("ownerEmail", product.getOwnerEmail())
                .bind("title", product.getTitle())
                .bind("description", product.getDescription())
                .bind("price", product.getPrice())
                .bind("condition", product.getCondition())
                .bind("status", product.getStatus())
                .bind("vector", product.getVector())
                .bind("photoFirst", product.getPhotoFirst())
                .bind("photoSecond", product.getPhotoSecond())
                .fetch()
                .rowsUpdated()
                .then();
    }

    private Mono<Void> createWithOnePhoto(ProductEntity product) {
        String sql = "INSERT INTO products (owner_email,title,description,price,condition,status,vector,photo_1) VALUES(:ownerEmail,:title,:description,:price,:condition,:status,:vector,:photoFirst)";

        return databaseClient.sql(sql)
                .bind("ownerEmail", product.getOwnerEmail())
                .bind("title", product.getTitle())
                .bind("description", product.getDescription())
                .bind("price", product.getPrice())
                .bind("condition", product.getCondition())
                .bind("status", product.getStatus())
                .bind("vector", product.getVector())
                .bind("photoFirst", product.getPhotoFirst())
                .fetch()
                .rowsUpdated()
                .then();
    }
}
