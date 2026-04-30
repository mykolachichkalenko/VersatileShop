package com.example.backend.Services.UserServices;

import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserBlockService {
    private final DatabaseClient databaseClient;

    public UserBlockService(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }


    public Mono<Boolean> blockUser(String myEmail, String userEmail) {
        String sql = """
        WITH b AS (SELECT id FROM users WHERE email = :myEmail),
             u AS (SELECT id FROM users WHERE email = :userEmail)
        INSERT INTO blocks (blocker_id, blocked_id)
        SELECT b.id, u.id
        FROM b CROSS JOIN u
        ON CONFLICT (blocker_id, blocked_id) DO NOTHING
        RETURNING 1 AS inserted
        """;

        return databaseClient.sql(sql)
                .bind("myEmail", myEmail)
                .bind("userEmail", userEmail)
                .map((row, meta) -> true)
                .one()
                .defaultIfEmpty(false);
    }
}