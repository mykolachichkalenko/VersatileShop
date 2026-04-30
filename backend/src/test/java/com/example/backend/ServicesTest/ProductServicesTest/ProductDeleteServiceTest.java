package com.example.backend.ServicesTest.ProductServicesTest;

import com.example.backend.Services.ProductServices.ProductDeleteService;
import com.example.backend.ServicesTest.BaseDBConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import reactor.test.StepVerifier;

import static org.junit.Assert.assertEquals;

public class ProductDeleteServiceTest extends BaseDBConfig {
    @Autowired
    ProductDeleteService productDeleteService;


    @Test
    public void productDeleteError() {
        StepVerifier.create(productDeleteService.deleteProductBuID(0L,"test@email"))
                .assertNext(status -> {
                    assertEquals("PDE", status);
                }).verifyComplete();
    }


}
