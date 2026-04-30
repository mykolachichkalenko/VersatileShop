package com.example.backend.Services.MessangerServices;

import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class MessagesGetLastReadMessageID {

    private final DatabaseClient databaseClient;
    private final ChatShardAndIDGetService chatShardAndIDGetService;

    public MessagesGetLastReadMessageID(DatabaseClient databaseClient, ChatShardAndIDGetService chatShardAndIDGetService) {
        this.databaseClient = databaseClient;
        this.chatShardAndIDGetService = chatShardAndIDGetService;
    }

    public Mono<Long> getLastReadID(Long myId, Long userId) {
        String sql = """
                SELECT id FROM messages_%s
                    WHERE chat_id = :chatId
                    AND sender_id = :myId
                    AND is_read = true
                    ORDER BY id DESC
                    LIMIT 1
                """;

        return chatShardAndIDGetService.getChatShardAndID(myId, userId)
                .flatMap(chatShardAndID -> {
                    String finalSql = sql.formatted(chatShardAndID.getShard());
                    return databaseClient.sql(finalSql)
                            .bind("chatId", chatShardAndID.getChatId())
                            .bind("myId", myId)
                            .map((row, metadata) -> row.get("id", Long.class))
                            .one();
                });
    }
}
