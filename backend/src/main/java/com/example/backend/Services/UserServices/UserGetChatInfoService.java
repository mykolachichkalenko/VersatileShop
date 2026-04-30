package com.example.backend.Services.UserServices;

import com.example.backend.DTOs.UserChatInfo;
import com.example.backend.Services.RedisServices.UserStatusService;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserGetChatInfoService {

    private final DatabaseClient databaseClient;
    private final UserStatusService userStatusService;

    public UserGetChatInfoService(DatabaseClient databaseClient, UserStatusService userStatusService) {
        this.databaseClient = databaseClient;
        this.userStatusService = userStatusService;
    }

    public Mono<UserChatInfo> getUserChatInfo(String email) {
        String sql = "SELECT name, avatar_url FROM users WHERE email = :email";

        return databaseClient.sql(sql)
                .bind("email", email)
                .map((row, metadata) -> {
                    UserChatInfo info = new UserChatInfo();
                    info.setUserEmail(email);
                    info.setUserName(row.get("name", String.class));
                    info.setUserAvatar(row.get("avatar_url", String.class));
                    return info;
                })
                .one()
                .flatMap(userInfo -> userStatusService.getStatus(email)
                        .map(status -> {
                            userInfo.setUserStatus(status);
                            return userInfo;
                        }));


    }
}
