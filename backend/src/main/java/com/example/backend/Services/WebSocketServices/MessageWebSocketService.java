package com.example.backend.Services.WebSocketServices;

import com.example.backend.DTOs.Message;
import com.example.backend.Services.JSONConverterServices.MessageJSONConverterService;
import com.example.backend.Services.MessangerServices.ChatShardAndIDGetOrCreateAndGet;
import com.example.backend.Services.MessangerServices.MessageCreateService;
import com.example.backend.Services.RedisServices.UserGetEmailByIDCache;
import com.example.backend.Services.UserServices.UserGetEmailByIDService;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class MessageWebSocketService implements WebSocketHandler {
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    private final MessageJSONConverterService messageJSONConverterService;
    private final ChatShardAndIDGetOrCreateAndGet chatShardAndIDGetOrCreateAndGet;
    private final UserGetEmailByIDCache userGetEmailByIDCache;
    private final UserGetEmailByIDService userGetEmailByIDService;
    private final MessageCreateService messageCreateService;
    private final EmailFromQuery emailFromQuery;

    public MessageWebSocketService(MessageJSONConverterService messageJSONConverterService, ChatShardAndIDGetOrCreateAndGet chatShardAndIDGetOrCreateAndGet, UserGetEmailByIDCache userGetEmailByIDCache, UserGetEmailByIDService userGetEmailByIDService, MessageCreateService messageCreateService, EmailFromQuery emailFromQuery) {
        this.messageJSONConverterService = messageJSONConverterService;
        this.chatShardAndIDGetOrCreateAndGet = chatShardAndIDGetOrCreateAndGet;
        this.userGetEmailByIDCache = userGetEmailByIDCache;
        this.userGetEmailByIDService = userGetEmailByIDService;
        this.messageCreateService = messageCreateService;
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
                    String messageJSON = msg.getPayloadAsText();

                    return messageJSONConverterService.fromJSON(messageJSON)
                            .flatMap(message ->
                                    chatShardAndIDGetOrCreateAndGet.getOrCreateChatShardAndID(message.getRecipientId(), message.getSenderId())
                                            .flatMap(chatShardAndID ->
                                                    userGetEmailByIDService.getEmail(message.getRecipientId())
                                                            .flatMap(userEmail -> {
                                                                WebSocketSession userSession = sessions.get(userEmail);
                                                                WebSocketSession mySession = sessions.get(myEmail);

                                                                if (userSession != null) {
                                                                    message.setIsRead(true);
                                                                }

                                                                return messageCreateService.createMessage(message, chatShardAndID)
                                                                        .flatMap(newMessage -> {
                                                                            if (userSession != null) {
                                                                                return sendMessageToFrontend(newMessage, userSession)
                                                                                        .then(sendMessageToFrontend(newMessage, mySession));
                                                                            }
                                                                            return sendMessageToFrontend(newMessage, mySession);
                                                                        });
                                                            })
                                            )
                            );
                }).doFinally(signal -> sessions.remove(myEmail))
                .then();
    }


    private Mono<Void> sendMessageToFrontend(Message message, WebSocketSession websocket) {
        return messageJSONConverterService.toJSON(message)
                .flatMap(textMessage ->
                        websocket.send(Mono.just(websocket.textMessage(textMessage)))
                );
    }
}