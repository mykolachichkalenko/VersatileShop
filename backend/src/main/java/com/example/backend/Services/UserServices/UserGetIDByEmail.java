package com.example.backend.Services.UserServices;

import com.example.backend.Services.RedisServices.UserGetEmailByIDCache;
import com.example.backend.Services.RedisServices.UserGetIDByEmailCache;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserGetIDByEmail {
    private final DatabaseClient databaseClient;
    private final UserGetIDByEmailCache userGetIDByEmailCache;

    public UserGetIDByEmail(DatabaseClient databaseClient, UserGetIDByEmailCache userGetIDByEmailCache) {
        this.databaseClient = databaseClient;
        this.userGetIDByEmailCache = userGetIDByEmailCache;
    }

    public Mono<Long> getId(String email) {
        String sql = "SELECT id FROM users WHERE email = :email";
        return userGetIDByEmailCache.getValue(email)
                .switchIfEmpty(Mono.defer(() ->
                        databaseClient.sql(sql)
                                .bind("email", email)
                                .map((row, rowMetadata) -> row.get("id", Long.class))
                                .one()
                                .flatMap(id -> userGetIDByEmailCache.setValue(email, id)
                                        .thenReturn(id))
                ));

    }
}
