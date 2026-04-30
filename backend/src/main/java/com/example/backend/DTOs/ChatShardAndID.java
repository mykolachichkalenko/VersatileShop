package com.example.backend.DTOs;

import lombok.Data;

@Data
public class ChatShardAndID {
    private Integer shard;
    private Long chatId;
}
