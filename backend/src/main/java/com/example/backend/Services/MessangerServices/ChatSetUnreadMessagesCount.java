package com.example.backend.Services.MessangerServices;

import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ChatSetUnreadMessagesCount {

    private final UnreadMessagesGet unreadMessagesGet;
    private final DatabaseClient databaseClient;

    public ChatSetUnreadMessagesCount(UnreadMessagesGet unreadMessagesGet, DatabaseClient databaseClient) {
        this.unreadMessagesGet = unreadMessagesGet;
        this.databaseClient = databaseClient;
    }

    public Mono<Void> clear(Long chatId, Long userId) {
        String sql = """
                 UPDATE user_chat_unread_messages
                 SET unread_count = 0
                 WHERE chat_id = :chatId AND user_id = :userId
                """;

        return unreadMessagesGet.isExistsUnreadMessages(chatId, userId)
                .flatMap(exists -> {
                    if (exists) {
                        return databaseClient.sql(sql)
                                .bind("chatId", chatId)
                                .bind("userId", userId)
                                .fetch()
                                .rowsUpdated()
                                .then();
                    }
                    return Mono.empty();
                });
    }
}
