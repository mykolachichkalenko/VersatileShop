package com.example.backend.Services.MessangerServices;

import com.example.backend.DTOs.ChatShardAndID;
import com.example.backend.Services.RedisServices.ChatShardAndIDGetCache;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ChatShardAndIDGetService {


    private final DatabaseClient databaseClient;
    private final ChatShardAndIDGetCache chatShardAndIDGetCache;

    public ChatShardAndIDGetService(DatabaseClient databaseClient1, ChatShardAndIDGetCache chatShardAndIDGetCache) {
        this.databaseClient = databaseClient1;
        this.chatShardAndIDGetCache = chatShardAndIDGetCache;
    }

    public Mono<ChatShardAndID> getChatShardAndID(Long userId1, Long userId2) {
        String sql = """
                SELECT id,shard FROM chats
                WHERE (user1_id = :firstUser AND user2_id = :secondUser) 
                   OR (user1_id = :secondUser AND user2_id = :firstUser);
                """;

        return chatShardAndIDGetCache.getCache(userId1, userId2)
                .switchIfEmpty(Mono.defer(() ->
                                databaseClient.sql(sql)
                                        .bind("firstUser", userId1)
                                        .bind("secondUser", userId2)
                                        .map((row, rowMetadata) -> {
                                            ChatShardAndID result = new ChatShardAndID();

                                            result.setShard(row.get("shard", Integer.class));
                                            result.setChatId(row.get("id", Long.class));
                                            return result;
                                        })
                                        .one()
                                        .flatMap(chatShardAndID ->
                                                chatShardAndIDGetCache.setCache(userId1, userId2, chatShardAndID)
                                                        .thenReturn(chatShardAndID)
                                        )
                        )
                );
    }
}