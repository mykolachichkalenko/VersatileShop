package com.example.backend.Services.MessangerServices;

import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class MessagesSetRead {
    private final DatabaseClient databaseClient;
    private final ChatShardAndIDGetService chatShardAndIDGetService;
    private final ChatSetUnreadMessagesCount chatSetUnreadMessagesCount;

    public MessagesSetRead(DatabaseClient databaseClient, ChatShardAndIDGetService chatShardAndIDGetService, ChatSetUnreadMessagesCount chatSetUnreadMessagesCount) {
        this.databaseClient = databaseClient;
        this.chatShardAndIDGetService = chatShardAndIDGetService;
        this.chatSetUnreadMessagesCount = chatSetUnreadMessagesCount;
    }

    public Mono<Void> set(Long myId, Long userId) {
        String sql = """
                UPDATE messages_%s
                    SET is_read = true
                    WHERE chat_id = :chatId
                    AND sender_id = :userId
                    AND is_read = false
                """;

        return chatShardAndIDGetService.getChatShardAndID(myId, userId)
                .flatMap(chatShardAndID -> {
                    String finalSql = sql.formatted(chatShardAndID.getShard());
                    return databaseClient.sql(finalSql)
                            .bind("chatId", chatShardAndID.getChatId())
                            .bind("userId", userId)
                            .fetch()
                            .rowsUpdated()
                            .then(Mono.defer(() -> chatSetUnreadMessagesCount.clear(chatShardAndID.getChatId(), myId)));
                });
    }
}
