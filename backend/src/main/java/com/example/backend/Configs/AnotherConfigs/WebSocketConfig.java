package com.example.backend.Configs.AnotherConfigs;

import com.example.backend.Services.WebSocketServices.MessageWebSocketService;
import com.example.backend.Services.WebSocketServices.TypingWebSocketService;
import com.example.backend.Services.WebSocketServices.UpdateChatListWebsocketService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableWebFlux
public class WebSocketConfig {
    private final MessageWebSocketService messageWebSocketService;
    private final TypingWebSocketService typingWebSocketService;
    private final UpdateChatListWebsocketService updateChatListWebsocketService;

    public WebSocketConfig(MessageWebSocketService messageWebSocketService, TypingWebSocketService typingWebSocketService, UpdateChatListWebsocketService updateChatListWebsocketService) {
        this.messageWebSocketService = messageWebSocketService;
        this.typingWebSocketService = typingWebSocketService;
        this.updateChatListWebsocketService = updateChatListWebsocketService;
    }

    @Bean
    public HandlerMapping webSocketMapping() {
        Map<String, WebSocketHandler> map = new HashMap<>();

        map.put("/ws/sendMessage", messageWebSocketService);
        map.put("/ws/typing", typingWebSocketService);
        map.put("/ws/updateChatList", updateChatListWebsocketService);

        SimpleUrlHandlerMapping mapping = new SimpleUrlHandlerMapping();
        mapping.setOrder(-1);
        mapping.setUrlMap(map);
        return mapping;
    }

    @Bean
    public WebSocketHandlerAdapter handlerAdapter() {
        return new WebSocketHandlerAdapter();
    }
}
