package com.example.backend.Services.SellersServices;

import com.example.backend.DTOs.Seller;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class SellerGetByEmailService {
    private final DatabaseClient databaseClient;

    public SellerGetByEmailService(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    public Flux<Seller> getSellers(String email) {
        String sql = """
                SELECT id, name, email, avatar_url
                FROM users
                WHERE email ILIKE :prefix || '%'
                ORDER BY email
                LIMIT 20;
                """;

        return databaseClient.sql(sql)
                .bind("prefix", email)
                .map((map, metadata) -> {
                    Seller s = new Seller();
                    s.setEmail(map.get("email", String.class));
                    s.setId(map.get("id", Long.class));
                    s.setName(map.get("name", String.class));
                    s.setAvatarUrl(map.get("avatar_url", String.class));
                    return s;
                }).all();
    }
}
