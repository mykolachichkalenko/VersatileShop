package com.example.backend.Controllers;

import com.example.backend.DTOs.Seller;
import com.example.backend.Services.SellersServices.SellerGetByEmailService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class SellersController {

    private final SellerGetByEmailService sellerGetByEmailService;

    public SellersController(SellerGetByEmailService sellerGetByEmailService) {
        this.sellerGetByEmailService = sellerGetByEmailService;
    }

    @PostMapping("/sellers/getByEmail")
    public Flux<Seller> getSellersByEmail(@RequestBody Map map){
        String email = map.get("email").toString();
        return sellerGetByEmailService.getSellers(email);
    }
}
