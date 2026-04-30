package com.example.backend.Controllers;

import com.example.backend.DTOs.ProductLikeRequest;
import com.example.backend.DTOs.ProductLikedInformation;
import com.example.backend.DTOs.ProductResponse;
import com.example.backend.Services.ProductLikedService.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/product")
public class ProductLikeController {
    private final ProductLikeServiceGetFavoriteProducts productLikeServiceGetFavoriteProducts;
    private final ProductLikeServiceGetLikedProductInfo productLikeServiceGetLikedProductInfo;
    private final ProductLikeServiceDelete productLikeServiceDelete;
    private final ProductLikeServiceSetLiked productLikeServiceSetLiked;
    private final ProductLikeServiceGetLikeCount productLikeServiceGetLikeCount;

    public ProductLikeController(ProductLikeServiceGetFavoriteProducts productLikeServiceGetFavoriteProducts, ProductLikeServiceGetLikedProductInfo productLikeServiceGetLikedProductInfo, ProductLikeServiceDelete productLikeServiceDelete, ProductLikeServiceSetLiked productLikeServiceSetLiked, ProductLikeServiceGetLikeCount productLikeServiceGetLikeCount) {
        this.productLikeServiceGetFavoriteProducts = productLikeServiceGetFavoriteProducts;
        this.productLikeServiceGetLikedProductInfo = productLikeServiceGetLikedProductInfo;
        this.productLikeServiceDelete = productLikeServiceDelete;
        this.productLikeServiceSetLiked = productLikeServiceSetLiked;
        this.productLikeServiceGetLikeCount = productLikeServiceGetLikeCount;
    }

    @GetMapping("/get/favorites/{id}")
    public Flux<ProductResponse> getFavoriteProductById(@PathVariable("id") Long id, @AuthenticationPrincipal OAuth2User user) {
        String email = user.getAttribute("email");
        return productLikeServiceGetFavoriteProducts.getFavoriteProducts(id, email);
    }

    @GetMapping("/get/liked/information/{id}")
    public Mono<ProductLikedInformation> getLikedProductInformation(@PathVariable("id") Long id, @AuthenticationPrincipal OAuth2User user) {
        String email = "null";
        if (user != null) {
            email = user.getAttribute("email");
        }
        return productLikeServiceGetLikedProductInfo.getLikedProductInformation(email, id);
    }

    @GetMapping("/like/count")
    public Mono<Integer> getCountLikedProducts(@AuthenticationPrincipal OAuth2User user){
        String email  = user.getAttribute("email");
        return productLikeServiceGetLikeCount.getCount(email);
    }

    @PostMapping("/delete/liked")
    public Mono<Boolean> deleteProductLiked(@RequestBody ProductLikeRequest request) {
        return productLikeServiceDelete.deleteLikedProduct(request.getEmail(), request.getProductId());
    }

    @PostMapping("/set/liked")
    public Mono<Boolean> setProductLiked(@RequestBody ProductLikeRequest request) {
        return productLikeServiceSetLiked.likeProduct(request.getEmail(), request.getProductId());
    }
}
