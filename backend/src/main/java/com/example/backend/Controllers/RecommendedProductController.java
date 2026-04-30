package com.example.backend.Controllers;

import com.example.backend.DTOs.ProductResponse;
import com.example.backend.DTOs.RecommendedProductResponse;
import com.example.backend.Services.ProductServices.ProductGetRecommendedProducts;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recommended-product")
public class RecommendedProductController {

    private final ProductGetRecommendedProducts productGetRecommendedProducts;

    public RecommendedProductController(ProductGetRecommendedProducts productGetRecommendedProducts) {
        this.productGetRecommendedProducts = productGetRecommendedProducts;
    }

    @PostMapping("/get")
    public Mono<RecommendedProductResponse> getRecommendedProducts(@AuthenticationPrincipal OAuth2User user, @RequestBody Map map) {
        Long id = Long.parseLong((String) map.get("lastProductID"));
        String isDefaultFinding = (String) map.get("isDefaultFinding");
        Integer offset = (Integer) map.get("offset");

        List<Long> ids = ((List<?>) map.get("allIDs")).stream()
                .map(x -> ((Number) x).longValue())
                .toList();

        return productGetRecommendedProducts.getRecommendedProducts(user, id,isDefaultFinding,offset, ids);
    }
}
