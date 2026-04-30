package com.example.backend.Services.MessangerServices;

import com.example.backend.DTOs.IsBlock;
import com.example.backend.Services.UserServices.UserGetBlockInfoService;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ChatIsBlockedGetService {

    private final UserGetBlockInfoService userGetBlockInfoService;

    public ChatIsBlockedGetService(UserGetBlockInfoService userGetBlockInfoService) {
        this.userGetBlockInfoService = userGetBlockInfoService;
    }

    public Mono<IsBlock> getIsBlocked(String myEmail, String userEmail) {
        return userGetBlockInfoService.getIsUserBlocked(myEmail, userEmail)
                .flatMap(isUserBlocked ->
                        userGetBlockInfoService.getIsUserBlocked(userEmail, myEmail)
                                .map(isMeBlocked -> {
                                    IsBlock isBlock = new IsBlock();
                                    isBlock.setIsMeBlocked(isMeBlocked);
                                    isBlock.setIsUserBlocked(isUserBlocked);
                                    return isBlock;
                                }));
    }
}
