package com.example.backend.Services.UserServices;

import com.example.backend.Services.RedisServices.UserGetEmailByIDCache;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserGetEmailByIDService {

    private final DatabaseClient databaseClient;
    private final UserGetEmailByIDCache userGetEmailByIDCache;

    public UserGetEmailByIDService(DatabaseClient databaseClient, UserGetEmailByIDCache userGetEmailByIDCache) {
        this.databaseClient = databaseClient;
        this.userGetEmailByIDCache = userGetEmailByIDCache;
    }

    public Mono<String> getEmail(Long id) {
        String sql = "SELECT email FROM users WHERE id = :id";

        return userGetEmailByIDCache.getEmail(id)
                .switchIfEmpty(Mono.defer(() ->
                        databaseClient.sql(sql)
                                .bind("id", id)
                                .map((row, rowMetadata) -> row.get("email", String.class))
                                .one()
                                .flatMap(email -> userGetEmailByIDCache.setEmail(id, email)
                                        .thenReturn(email))
                ));
    }
}