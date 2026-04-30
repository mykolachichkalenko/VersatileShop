package com.example.backend.Controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Optional;

@RestController
@RequestMapping("/api/security")
public class SecurityController {

    @GetMapping("/authenticated")
    public Mono<Boolean> isAuthenticated(@AuthenticationPrincipal OAuth2User user) {
        return user == null ? Mono.just(false) : Mono.just(true);
    }

    @GetMapping("/name")
    public Mono<String> getName(@AuthenticationPrincipal OAuth2User user) {
        String name = "";

        if (user.getAttribute("name") != null){
            name = user.getAttribute("name");
        }

        return Mono.just(name);
    }
}
