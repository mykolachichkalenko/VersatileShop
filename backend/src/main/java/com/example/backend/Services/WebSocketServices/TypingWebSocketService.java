package com.example.backend.Services.WebSocketServices;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TypingWebSocketService implements WebSocketHandler {
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final EmailFromQuery emailFromQuery;

    public TypingWebSocketService(EmailFromQuery emailFromQuery) {
        this.emailFromQuery = emailFromQuery;
    }


    @Override
    public Mono<Void> handle(WebSocketSession session) {
        String myEmail = emailFromQuery.get(session);
        if (myEmail != null) {
            sessions.put(myEmail, session);
        }

        return session.receive()
                .concatMap(msg -> {
                    String userEmail = msg.getPayloadAsText();

                    WebSocketSession userSession = sessions.get(userEmail);

                    if (userSession != null) {
                        return userSession.send(Mono.just(userSession.textMessage(myEmail)));
                    }
                    return Mono.empty();
                })
                .doFinally(signalType -> sessions.remove(myEmail))
                .then();
    }
}