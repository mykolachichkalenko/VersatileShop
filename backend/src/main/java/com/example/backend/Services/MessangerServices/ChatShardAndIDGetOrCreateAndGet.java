package com.example.backend.Services.MessangerServices;

import com.example.backend.DTOs.ChatShardAndID;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.concurrent.atomic.AtomicLong;

@Service
public class ChatShardAndIDGetOrCreateAndGet {
    private final DatabaseClient databaseClient;
    private final ChatShardAndIDGetService chatShardAndIDGetService;
    private AtomicLong chatIdCounter = new AtomicLong(5);

    public ChatShardAndIDGetOrCreateAndGet(DatabaseClient databaseClient, ChatShardAndIDGetService chatShardAndIDGetService) {
        this.databaseClient = databaseClient;
        this.chatShardAndIDGetService = chatShardAndIDGetService;
    }


    public Mono<ChatShardAndID> getOrCreateChatShardAndID(Long userId1, Long userId2) {
        return chatShardAndIDGetService.getChatShardAndID(userId1, userId2)
                .switchIfEmpty(Mono.defer(() ->
                        createChat(userId1, userId2)
                                .flatMap(res -> chatShardAndIDGetService.getChatShardAndID(userId1, userId2))
                ));
    }



    private Mono<Boolean> createChat(Long userId1, Long userId2) {
        String sql = """
                INSERT INTO chats (user1_id,user2_id,shard) VALUES (:userId1,:userId2,:shard);
                """;
        long newShard = (chatIdCounter.incrementAndGet() % 5);

        return databaseClient.sql(sql)
                .bind("userId1", userId1)
                .bind("userId2", userId2)
                .bind("shard", (int) newShard)
                .fetch()
                .rowsUpdated()
                .map(rows -> rows > 0);
    }
}