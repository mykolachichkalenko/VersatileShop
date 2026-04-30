package com.example.backend.Services.UserServices;

import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserGetBlockInfoService {
    private final DatabaseClient databaseClient;

    public UserGetBlockInfoService(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    public Mono<Boolean> getIsUserBlocked(String myEmail, String userEmail) {
        String sql = """
        SELECT EXISTS (
            SELECT 1
            FROM blocks
            WHERE blocker_id = (SELECT id FROM users WHERE email = :myEmail)
              AND blocked_id = (SELECT id FROM users WHERE email = :userEmail)
        ) AS is_blocked
        """;

        return databaseClient.sql(sql)
                .bind("myEmail", myEmail)
                .bind("userEmail", userEmail)
                .map((row, meta) -> row.get("is_blocked", Boolean.class))
                .one()
                .defaultIfEmpty(false);
    }

}