package com.example.backend.Services.MessangerServices;

import com.example.backend.DTOs.ChatShardAndID;
import com.example.backend.DTOs.Message;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
public class MessageCreateService {


    private final DatabaseClient databaseClient;
    private final UnreadMessagesSet unreadMessagesSet;
    private final ChatUpdateSet chatUpdateSet;

    public MessageCreateService(DatabaseClient databaseClient, UnreadMessagesSet unreadMessagesSet, ChatUpdateSet chatUpdateSet) {
        this.databaseClient = databaseClient;
        this.unreadMessagesSet = unreadMessagesSet;
        this.chatUpdateSet = chatUpdateSet;
    }

    public Mono<Message> createMessage(Message message, ChatShardAndID chatShardAndID) {
        String sql = """
                INSERT INTO messages_%s
                (temporary_id,chat_id,sender_id,recipient_id,content,is_read,type)
                   VALUES (:temporaryId,:chatId,:senderId,:recipientId,:content,:isRead,:type)
                   RETURNING id, temporary_id, chat_id, sender_id, recipient_id, content, is_read, type, created_at
                """.formatted(chatShardAndID.getShard());

        return databaseClient.sql(sql)
                .bind("temporaryId", message.getTemporaryId())
                .bind("chatId", chatShardAndID.getChatId())
                .bind("senderId", message.getSenderId())
                .bind("recipientId", message.getRecipientId())
                .bind("content", message.getContent())
                .bind("isRead", message.getIsRead())
                .bind("type", message.getType())
                .map((row, rowMetadata) -> {

                    Message newMessage = new Message();
                    newMessage.setId(row.get("id", Long.class));
                    newMessage.setTemporaryId(row.get("temporary_id", String.class));
                    newMessage.setChatId(row.get("chat_id", Long.class));
                    newMessage.setSenderId(row.get("sender_id", Long.class));
                    newMessage.setRecipientId(row.get("recipient_id", Long.class));
                    newMessage.setContent(row.get("content", String.class));
                    newMessage.setIsRead(row.get("is_read", Boolean.class));
                    newMessage.setType(row.get("type", String.class));
                    newMessage.setCreatedAt(row.get("created_at", LocalDateTime.class));
                    return newMessage;

                })
                .one()
                .flatMap(msg -> {
                    if (!msg.getIsRead()) {
                        return unreadMessagesSet.setUnreadPlusOne(chatShardAndID.getChatId(), message.getRecipientId())
                                .thenReturn(msg);
                    }
                    return Mono.just(msg);
                })
                .flatMap(msg -> chatUpdateSet.setUpdate(chatShardAndID.getChatId())
                        .thenReturn(msg));
    }
}