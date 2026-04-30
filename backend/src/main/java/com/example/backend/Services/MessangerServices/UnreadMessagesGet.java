package com.example.backend.Services.MessangerServices;

import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UnreadMessagesGet {

    private final DatabaseClient databaseClient;

    public UnreadMessagesGet(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    public Mono<Boolean> isExistsUnreadMessages(Long chatId, Long recipientId) {
        String sql = """
                SELECT EXISTS(
                    SELECT 1
                    FROM user_chat_unread_messages
                    WHERE chat_id = :chatId AND user_id = :recipientId
                ) AS exists_flag
                """;

        return databaseClient.sql(sql)
                .bind("chatId", chatId)
                .bind("recipientId", recipientId)
                .map((row, metadata) -> row.get("exists_flag", Boolean.class))
                .one();
    }
}
