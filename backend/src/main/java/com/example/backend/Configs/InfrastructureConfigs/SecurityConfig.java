package com.example.backend.Configs.InfrastructureConfigs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.RedirectServerAuthenticationSuccessHandler;
import org.springframework.security.web.server.authentication.logout.RedirectServerLogoutSuccessHandler;

import java.net.URI;

@EnableWebFluxSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {

        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchange -> exchange
                        .pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .pathMatchers(
                                "/api/security/authenticated",
                                "/api/get/my-profile",
                                "/api/recommended-product/get",
                                "/api/product/get/**",
                                "/api/get/my/email",
                                "/api/product/get/liked/information/**",
                                "/api/change-status",
                                "api/product/get/bySearch",
                                "/api/product/reviews/**",
                                "/api/product/reviews/my-review-exists/**",
                                "/api/product/reviews/average-rating-and-reviews-count/**",
                                "/api/user/getUserInfo",
                                "/api/user/getUserProducts",
                                "/api/product/count/byEmail/**",
                                "/api/user/reviews/isMyReviewExists",
                                "/api/user/reviews/AverageRatingAndReviewsCount/**",
                                "/api/user/reviews",
                                "/api/sellers/getByEmail",
                                "/ws/sendMessage").permitAll()
                        .anyExchange().authenticated()
                )
                .oauth2Login(oauth2LoginSpec -> oauth2LoginSpec
                        .loginPage("/oauth2/authorization/google")
                        .authenticationSuccessHandler(new RedirectServerAuthenticationSuccessHandler("http://localhost:3000/registration"))
                )
                .logout(logout -> logout
                        .logoutUrl("/api/security/logout"))
                .build();
    }

}