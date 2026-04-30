package com.example.backend.Services.WebSocketServices;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.socket.WebSocketSession;

@Service
public class EmailFromQuery {

    public String get(WebSocketSession session) {
        String query = session.getHandshakeInfo().getUri().getQuery();
        if (query == null || !query.startsWith("email=")) {
            return null;
        }
        return query.substring("email=".length());
    }
}
