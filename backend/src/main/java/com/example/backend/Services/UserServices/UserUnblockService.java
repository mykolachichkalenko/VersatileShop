package com.example.backend.Services.UserServices;

import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserUnblockService {
    private final DatabaseClient databaseClient;

    public UserUnblockService(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }


    public Mono<Boolean> unblockUser(String myEmail,String userEmail){
        String sql = """
                DELETE FROM blocks
                WHERE blocker_id = (SELECT id FROM users WHERE email = :myEmail)
                  AND blocked_id = (SELECT id FROM users WHERE email = :userEmail);
                """;

        return databaseClient.sql(sql)
                .bind("myEmail", myEmail)
                .bind("userEmail", userEmail)
                .fetch()
                .rowsUpdated()
                .map(rows -> rows > 0);
    }
}
