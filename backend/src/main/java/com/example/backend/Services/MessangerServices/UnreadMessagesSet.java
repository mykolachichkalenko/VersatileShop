package com.example.backend.Services.MessangerServices;

import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UnreadMessagesSet {

    private final DatabaseClient databaseClient;
    private final UnreadMessagesGet unreadMessagesGet;
    private final UnreadMessagesCreate unreadMessagesCreate;

    public UnreadMessagesSet(DatabaseClient databaseClient, UnreadMessagesGet unreadMessagesGet, UnreadMessagesCreate unreadMessagesCreate) {
        this.databaseClient = databaseClient;
        this.unreadMessagesGet = unreadMessagesGet;
        this.unreadMessagesCreate = unreadMessagesCreate;
    }

    public Mono<Void> setUnreadPlusOne(Long chatId, Long recipientId) {


        return unreadMessagesGet.isExistsUnreadMessages(chatId, recipientId)
                .flatMap(exists -> {
                    if (exists) return setPlusOne(chatId, recipientId);

                    return unreadMessagesCreate.create(chatId,recipientId,1);
                });
    }

    private Mono<Void> setPlusOne(Long chatId, Long recipientId) {
        String sql = """
                UPDATE user_chat_unread_messages
                SET unread_count = unread_count + 1
                WHERE chat_id = :chatId AND user_id = :recipientId
                """;

        return databaseClient.sql(sql)
                .bind("chatId", chatId)
                .bind("recipientId", recipientId)
                .fetch().rowsUpdated().then();
    }
}
