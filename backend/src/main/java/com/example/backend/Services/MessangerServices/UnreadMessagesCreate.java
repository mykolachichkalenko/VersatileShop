package com.example.backend.Services.MessangerServices;

import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UnreadMessagesCreate {

    private final DatabaseClient databaseClient;

    public UnreadMessagesCreate(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    public Mono<Void> create(Long chatId, Long recipientId, Integer unreadCount) {
        String sql = """
                INSERT INTO user_chat_unread_messages (chat_id,user_id,unread_count)
                VALUES (:chatId, :recipientId, :unreadCount)
                """;

        return databaseClient.sql(sql)
                .bind("chatId", chatId)
                .bind("recipientId", recipientId)
                .bind("unreadCount", unreadCount)
                .fetch().rowsUpdated().then();
    }
}
