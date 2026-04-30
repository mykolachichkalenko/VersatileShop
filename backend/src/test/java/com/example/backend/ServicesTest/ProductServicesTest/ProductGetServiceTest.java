package com.example.backend.ServicesTest.ProductServicesTest;

import com.example.backend.Services.ProductServices.ProductGetService;
import com.example.backend.ServicesTest.BaseDBConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import reactor.test.StepVerifier;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ProductGetServiceTest extends BaseDBConfig {
    @Autowired
    ProductGetService productGetService;


    @Test
    public void getProductByIdTest() {
        StepVerifier.create(productGetService.getProductById(0L))
                .assertNext(p -> assertEquals(p.getId(), -1)).verifyComplete();
    }

}
