package com.example.backend.Services.MessangerServices;

import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ChatUpdateSet {

    private final DatabaseClient databaseClient;

    public ChatUpdateSet(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    public Mono<Void> setUpdate(Long chatId){
        String sql = "UPDATE chats SET updated_at = CURRENT_TIMESTAMP WHERE id = :chatId";
        return databaseClient.sql(sql)
                .bind("chatId", chatId)
                .fetch().rowsUpdated().then();
    }
}
