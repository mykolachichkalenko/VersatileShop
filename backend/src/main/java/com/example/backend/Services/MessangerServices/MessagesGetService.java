package com.example.backend.Services.MessangerServices;

import com.example.backend.DTOs.Message;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;

@Service
public class MessagesGetService {
    private final DatabaseClient databaseClient;
    private final ChatShardAndIDGetService chatShardAndIDGetService;

    public MessagesGetService(DatabaseClient databaseClient, ChatShardAndIDGetService chatShardAndIDGetService) {
        this.databaseClient = databaseClient;
        this.chatShardAndIDGetService = chatShardAndIDGetService;
    }

    public Flux<Message> getMessages(Long firstUserID, Long secondUserID, Long minID) {
        String sql = """
                SELECT id, temporary_id, chat_id, sender_id, recipient_id, content, is_read, type, created_at
                FROM (
                    SELECT id, temporary_id, chat_id, sender_id, recipient_id, content, is_read, type, created_at
                    FROM messages_%s
                    WHERE chat_id = :chatId
                      AND (:minId = 0 OR id < :minId)
                    ORDER BY id DESC
                    LIMIT 30
                ) t
                ORDER BY id ASC
                """;

        return chatShardAndIDGetService.getChatShardAndID(firstUserID, secondUserID)
                .flatMapMany(chatShardAndID -> {
                    String formattedSql = sql.formatted(chatShardAndID.getShard());

                    return databaseClient.sql(formattedSql)
                            .bind("chatId", chatShardAndID.getChatId())
                            .bind("minId", minID)
                            .map((row, rowMeta) -> {

                                Message message = new Message();

                                message.setId(row.get("id", Long.class));
                                message.setTemporaryId(row.get("temporary_id", String.class));
                                message.setChatId(row.get("chat_id", Long.class));
                                message.setSenderId(row.get("sender_id", Long.class));
                                message.setRecipientId(row.get("recipient_id", Long.class));
                                message.setContent(row.get("content", String.class));
                                message.setIsRead(row.get("is_read", Boolean.class));
                                message.setType(row.get("type", String.class));
                                message.setCreatedAt(row.get("created_at", LocalDateTime.class));

                                return message;
                            })
                            .all();
                });
    }
}