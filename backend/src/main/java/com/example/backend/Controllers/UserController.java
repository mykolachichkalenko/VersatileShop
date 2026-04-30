package com.example.backend.Controllers;

import com.example.backend.DTOs.ProductResponse;
import com.example.backend.DTOs.UserChatInfo;
import com.example.backend.DTOs.UserInfo;
import com.example.backend.Services.UserServices.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserGetUserInfoService userGetUserInfoService;
    private final UserGetUserProducts userGetUserProducts;
    private final UserGetBlockInfoService userGetBlockInfoService;
    private final UserBlockService userBlockService;
    private final UserUnblockService userUnblockService;
    private final UserGetIDByEmail userGetIDByEmail;
    private final UserGetChatInfoService userGetChatInfoService;

    public UserController(UserGetUserInfoService userGetUserInfoService, UserGetUserProducts userGetUserProducts, UserGetBlockInfoService userGetBlockInfoService, UserBlockService userBlockService, UserUnblockService userUnblockService, UserGetIDByEmail userGetIDByEmail, UserGetChatInfoService userGetChatInfoService) {
        this.userGetUserInfoService = userGetUserInfoService;
        this.userGetUserProducts = userGetUserProducts;
        this.userGetBlockInfoService = userGetBlockInfoService;
        this.userBlockService = userBlockService;
        this.userUnblockService = userUnblockService;
        this.userGetIDByEmail = userGetIDByEmail;
        this.userGetChatInfoService = userGetChatInfoService;
    }

    @PostMapping("/get/id/byEmail")
    public Mono<Long> getIdByEmail(@RequestBody Map map){
        String email = (String) map.get("email");
        return userGetIDByEmail.getId(email);
    }

    @PostMapping("/getUserInfo")
    public Mono<UserInfo> getUserInfo(@RequestBody Map map) {
        String email = (String) map.get("email");
        return userGetUserInfoService.getUserInfo(email);
    }

    @PostMapping("/getChatUserInfo")
    public Mono<UserChatInfo> getUserChatInfo(@RequestBody Map map){
        String email = (String) map.get("userEmail");
        return userGetChatInfoService.getUserChatInfo(email);
    }

    @PostMapping("/getUserProducts")
    public Flux<ProductResponse> getUserProducts(@RequestBody Map map) {
        String email = String.valueOf(map.get("email"));
        Long minId = 0L;
        if(map.get("minId") != null){
            minId = Long.valueOf(String.valueOf(map.get("minId")));
        }
        return userGetUserProducts.getUserProducts(email, minId);
    }

    @PostMapping("/isBlocked")
    public Mono<Boolean> getIsUserBlocked(@AuthenticationPrincipal OAuth2User user, @RequestBody Map map){
        String myEmail = user.getAttribute("email");
        String userEmail = String.valueOf(map.get("userEmail"));

        return userGetBlockInfoService.getIsUserBlocked(myEmail,userEmail);
    }



    @PostMapping("/blockUser")
    public Mono<Boolean> blockUserByEmail(@AuthenticationPrincipal OAuth2User user, @RequestBody Map map) {
        String myEmail = user.getAttribute("email");
        String userEmail = String.valueOf(map.get("email"));

        return userBlockService.blockUser(myEmail,userEmail);
    }

    @PostMapping("/unblockUser")
    public Mono<Boolean> unblockUserByEmail(@AuthenticationPrincipal OAuth2User user, @RequestBody Map map) {
        String myEmail = user.getAttribute("email");
        String userEmail = String.valueOf(map.get("email"));

        return userUnblockService.unblockUser(myEmail,userEmail);
    }
}