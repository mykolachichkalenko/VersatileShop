package com.example.backend.Services.UserServices;

import com.example.backend.DTOs.ProductResponse;
import com.example.backend.Services.ProductServices.ProductGetService;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class UserGetUserProducts {


    private final ProductGetService productGetService;

    public UserGetUserProducts(ProductGetService productGetService) {
        this.productGetService = productGetService;
    }

    public Flux<ProductResponse> getUserProducts(String email, Long minId) {
        return productGetService.getProducts(0, minId.intValue(), email);
    }
}
