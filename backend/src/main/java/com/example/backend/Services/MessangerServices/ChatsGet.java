package com.example.backend.Services.MessangerServices;

import com.example.backend.DTOs.Chat;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;

@Service
public class ChatsGet {
    private final DatabaseClient databaseClient;

    public ChatsGet(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    public Flux<Chat> getChatsByEmail(String email) {
        String sql = """
            SELECT
                c.id AS id,
                u_other.name AS "userName",
                u_other.email AS "userEmail",
                u_other.avatar_url AS "userAvatar",
                c.updated_at AS "updatedAt",
                COALESCE(ucum.unread_count, 0) AS "unreadMessagesCount"
            FROM chats c
            JOIN users me
                ON me.email = :email
            JOIN users u_other
                ON u_other.id = CASE
                    WHEN c.user1_id = me.id THEN c.user2_id
                    ELSE c.user1_id
                END
            LEFT JOIN user_chat_unread_messages ucum
                ON ucum.chat_id = c.id
               AND ucum.user_id = me.id
            WHERE c.user1_id = me.id
               OR c.user2_id = me.id
            """;

        return databaseClient.sql(sql)
                .bind("email", email)
                .map((row, metadata) -> {
                    Chat chat = new Chat();
                    chat.setId(row.get("id", Long.class));
                    chat.setUserName(row.get("userName", String.class));
                    chat.setUserEmail(row.get("userEmail", String.class));
                    chat.setUserAvatar(row.get("userAvatar", String.class));
                    chat.setUpdatedAt(row.get("updatedAt", LocalDateTime.class));
                    chat.setUnreadMessagesCount(row.get("unreadMessagesCount", Integer.class));
                    return chat;
                })
                .all();
    }
}
