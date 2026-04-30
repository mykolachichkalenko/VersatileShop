package com.example.backend.Services.WebSocketServices;

import com.example.backend.DTOs.UserAvatarAndName;
import com.example.backend.Services.JSONConverterServices.ChatJSONConverter;
import lombok.Data;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class UpdateChatListWebsocketService implements WebSocketHandler {
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final EmailFromQuery emailFromQuery;
    private final ChatJSONConverter chatJSONConverter;
    private final DatabaseClient databaseClient;

    public UpdateChatListWebsocketService(EmailFromQuery emailFromQuery, ChatJSONConverter chatJSONConverter, DatabaseClient databaseClient) {
        this.emailFromQuery = emailFromQuery;
        this.chatJSONConverter = chatJSONConverter;
        this.databaseClient = databaseClient;
    }


    @Override
    public Mono<Void> handle(WebSocketSession session) {
        String myEmail = emailFromQuery.get(session);

        if (myEmail != null) {
            sessions.put(myEmail, session);
        }

        return session.receive()
                .concatMap(message ->
                        chatJSONConverter.fromJSON(message.getPayloadAsText())
                                .flatMap(chat -> {
                                            String userEmail = chat.getUserEmail();
                                            WebSocketSession userSession = sessions.get(userEmail);

                                            if (userSession == null) return Mono.empty();

                                            chat.setUserEmail(myEmail);
                                            return getUserAvatarAndName(myEmail)
                                                    .flatMap(userData -> {
                                                        chat.setUserName(userData.getName());
                                                        chat.setUserAvatar(userData.getAvatar());
                                                        return chatJSONConverter.toJSON(chat)
                                                                .flatMap(json -> userSession.send(Mono.just(userSession.textMessage(json))));
                                                    });
                                        }
                                )
                )
                .doFinally(signalType -> sessions.remove(myEmail))
                .then();
    }


    private Mono<UserAvatarAndName> getUserAvatarAndName(String email) {
        String sql = "SELECT name, avatar_url FROM users WHERE email = :email";

        return databaseClient.sql(sql)
                .bind("email", email)
                .map((row, metadata) -> {
                    UserAvatarAndName user = new UserAvatarAndName();
                    String name = row.get("name", String.class);
                    String avatar = row.get("avatar_url", String.class);

                    user.setAvatar(avatar);
                    user.setName(name);
                    return user;
                })
                .one();
    }
}

