package com.example.backend.Controllers;

import com.example.backend.DTOs.*;
import com.example.backend.Services.AiServices.EmbeddingService;
import com.example.backend.Services.ProductServices.*;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    private final ProductCreateService productCreateService;
    private final ProductGetService productGetService;
    private final ProductDeleteService productDeleteService;
    private final ProductUpdateService productUpdateService;
    private final ProductsGetBySearch productsGetBySearch;

    public ProductController(ProductCreateService productCreateService, ProductGetService productGetService, ProductDeleteService productDeleteService, ProductUpdateService productUpdateService, ProductsGetBySearch productsGetBySearch) {
        this.productCreateService = productCreateService;
        this.productGetService = productGetService;
        this.productDeleteService = productDeleteService;
        this.productUpdateService = productUpdateService;
        this.productsGetBySearch = productsGetBySearch;
    }

    @PostMapping("/get/all")
    public Flux<ProductResponse> getAllMyProducts(@RequestBody Map map, @AuthenticationPrincipal OAuth2User user) {
        int page = (int) map.get("page");
        int lastProductId = (int) map.get("lastProductId");

        return productGetService.getProducts(page, lastProductId, user.getAttribute("email"));
    }

    @GetMapping("/get/{id}")
    public Mono<ProductResponse> getProductById(@PathVariable("id") Long id) {
        return productGetService.getProductById(id);
    }


    @GetMapping("/get/forEdit/{id}")
    public Mono<ProductResponse> getProductByIdForEdit(@PathVariable("id") Long id, @AuthenticationPrincipal OAuth2User user) {
        String email = user.getAttribute("email");
        return productGetService.getProductByIdForEdit(id, email);
    }

    @PostMapping("/get/bySearch")
    public Flux<ProductResponse> getProductsBySearchAndFilters(@AuthenticationPrincipal OAuth2User user, @RequestBody SearchRequest req) {
        String email;
        if (user != null) {
            email = user.getAttribute("email");
        } else {
            email = "null";
        }
        return productsGetBySearch.getProductsBySearch(req.getSearchText(), req.getExcludedIds(), req.getFilters(), email);
    }

    @GetMapping("/count")
    public Mono<Integer> getCount(@AuthenticationPrincipal OAuth2User user) {
        return productGetService.getCountMyProduct(user.getAttribute("email"));
    }

    @GetMapping("/count/byEmail/{email}")
    public Mono<Integer> getCountByEmail(@PathVariable("email") String email) {
        return productGetService.getCountMyProduct(email);
    }

    @PostMapping("/create")
    public Mono<String> createProduct(@RequestPart("title") String title,
                                      @RequestPart("description") String description,
                                      @RequestPart("price") String price,
                                      @RequestPart("condition") String condition,
                                      @RequestPart("firstPhoto") FilePart firstPhoto,
                                      @RequestPart(value = "secondPhoto", required = false) FilePart secondPhoto,
                                      @RequestPart(value = "thirdPhoto", required = false) FilePart thirdPhoto,
                                      @AuthenticationPrincipal OAuth2User user) {

        CreateProductForm productForm = new CreateProductForm(
                title, description, new BigDecimal(price.replace(',', '.')).setScale(2, RoundingMode.HALF_UP),
                condition, firstPhoto, secondPhoto, thirdPhoto);

        return productCreateService.createProduct(productForm, user.getAttribute("email"))
                .thenReturn("PCS")
                .onErrorResume(e -> Mono.just("PCE"));
    }



    @PostMapping("/edit")
    public Mono<String> editProduct(@RequestPart("id") String id,
                                    @RequestPart(value = "title", required = false) String title,
                                    @RequestPart(value = "description", required = false) String description,
                                    @RequestPart(value = "price", required = false) String price,
                                    @RequestPart(value = "condition", required = false) String condition,
                                    @RequestPart(value = "firstFile", required = false) FilePart firstFile,
                                    @RequestPart(value = "secondFile", required = false) FilePart secondFile,
                                    @RequestPart(value = "thirdFile", required = false) FilePart thirdFile,
                                    @AuthenticationPrincipal OAuth2User user) {
        CreateProductForm createProductForm = new CreateProductForm();
        if (title != null) {
            createProductForm.setTitle(title);
        }
        if (description != null) {
            createProductForm.setDescription(description);
        }
        if (price != null) {
            createProductForm.setPrice(new BigDecimal(price.replace(',', '.')).setScale(2, RoundingMode.HALF_UP));
        }
        if (condition != null) {
            createProductForm.setCondition(condition);
        }
        if (firstFile != null) {
            createProductForm.setPhotoFirst(firstFile);
        }
        if (secondFile != null) {
            createProductForm.setPhotoSecond(secondFile);
        }
        if (thirdFile != null) {
            createProductForm.setPhotoThird(thirdFile);
        }

        return productUpdateService.updateProduct(createProductForm, user.getAttribute("email"), Long.parseLong(id));
    }


    @PostMapping("/delete/{id}")
    public Mono<String> deleteProduct(@PathVariable("id") Long id, @AuthenticationPrincipal OAuth2User user) {
        return productDeleteService.deleteProductBuID(id, user.getAttribute("email"))
                .onErrorResume(e -> Mono.just("PDE"));
    }

}
