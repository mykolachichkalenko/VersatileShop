package com.example.backend.Controllers;

import com.example.backend.DTOs.Chat;
import com.example.backend.DTOs.IsBlock;
import com.example.backend.DTOs.Message;
import com.example.backend.Services.MessangerServices.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api/messenger")
public class MessengerController {


    private final MessagesGetService messagesGetService;
    private final MessagesGetLastReadMessageID messagesGetLastReadMessageID;
    private final MessagesSetRead messagesSetRead;
    private final ChatIsBlockedGetService chatIsBlockedGetService;
    private final ChatsGet chatsGet;

    public MessengerController(MessagesGetService messagesGetService, MessagesGetLastReadMessageID messagesGetLastReadMessageID, MessagesSetRead messagesSetRead, ChatIsBlockedGetService chatIsBlockedGetService, ChatsGet chatsGet) {
        this.messagesGetService = messagesGetService;
        this.messagesGetLastReadMessageID = messagesGetLastReadMessageID;
        this.messagesSetRead = messagesSetRead;
        this.chatIsBlockedGetService = chatIsBlockedGetService;
        this.chatsGet = chatsGet;
    }

    @GetMapping("/get/chats")
    public Flux<Chat> getChats(@AuthenticationPrincipal OAuth2User user){
        String myEmail = user.getAttribute("email");
        return chatsGet.getChatsByEmail(myEmail);
    }

    @PostMapping("/getMessages")
    public Flux<Message> getMessages(@RequestBody Map map){
        Long firstUserID = ((Number) map.get("myId")).longValue();
        Long secondUserID = ((Number) map.get("userId")).longValue();
        Long minID = ((Number) map.get("minId")).longValue();

        return messagesGetService.getMessages(firstUserID,secondUserID,minID);
    }

    @PostMapping("/getLastReadID")
    public Mono<Long> getLastReadID(@RequestBody Map map){
        Long myId = ((Number) map.get("myId")).longValue();
        Long userId = ((Number) map.get("userId")).longValue();
        return messagesGetLastReadMessageID.getLastReadID(myId,userId);
    }

    @PostMapping("/getIsBlocked")
    public Mono<IsBlock> getIsBlocked(@RequestBody Map map, @AuthenticationPrincipal OAuth2User user){
        String userEmail = (String) map.get("userEmail");
        String myEmail = user.getAttribute("email");
        return chatIsBlockedGetService.getIsBlocked(myEmail,userEmail);
    }

    @PostMapping("/setMessagesRead")
    public Mono<Void> setMessagesRead(@RequestBody Map map){
        Long myId = ((Number) map.get("myId")).longValue();
        Long userId = ((Number) map.get("userId")).longValue();
        return messagesSetRead.set(myId,userId);
    }
}
