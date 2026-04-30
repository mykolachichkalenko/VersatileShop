package com.example.backend.Services.UserServices;

import com.example.backend.DTOs.UserInfo;
import com.example.backend.Services.RedisServices.UserCacheService;
import com.example.backend.Services.RedisServices.UserInfoCacheService;
import com.example.backend.Services.RedisServices.UserStatusService;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserGetUserInfoService {

    private final DatabaseClient databaseClient;
    private final UserStatusService userStatusService;
    private final UserInfoCacheService userInfoCacheService;

    public UserGetUserInfoService(DatabaseClient databaseClient, UserStatusService userStatusService, UserInfoCacheService userInfoCacheService) {
        this.databaseClient = databaseClient;
        this.userStatusService = userStatusService;
        this.userInfoCacheService = userInfoCacheService;
    }

    public Mono<UserInfo> getUserInfo(String email) {
        String sql = """
                SELECT
                  u.avatar_url                         AS "userURL",
                  u.status                             AS "userStatus",
                  u.name                               AS "userName",
                  COALESCE(r.avg_rating, 0)::float8    AS "userRating",
                  COALESCE(r.reviews_count, 0)::int    AS "userReviewsCount"
                FROM users u
                LEFT JOIN (
                  SELECT
                    reviewed_user_id,
                    ROUND(AVG(rating)::numeric, 1)     AS avg_rating,
                    COUNT(*)                           AS reviews_count
                  FROM user_reviews
                  GROUP BY reviewed_user_id
                ) r ON r.reviewed_user_id = u.id
                WHERE u.email = :email;
                """;

        return userInfoCacheService.getValue(email)
                .switchIfEmpty(databaseClient.sql(sql)
                        .bind("email", email)
                        .map((row, rowMetadata) -> {
                            UserInfo userInfo = new UserInfo();
                            userInfo.setUserURL(row.get("userURL", String.class));
                            userInfo.setUserStatus(row.get("userStatus", String.class));
                            userInfo.setUserName(row.get("userName", String.class));
                            userInfo.setUserRating(row.get("userRating", Double.class));
                            userInfo.setUserReviewsCount(row.get("userReviewsCount", Integer.class));
                            return userInfo;
                        })
                        .one())
                .flatMap(userInfo -> userInfoCacheService.setValue(email, userInfo).thenReturn(userInfo))
                .flatMap(userInfo -> userStatusService.getStatus(email)
                        .map(status -> {
                            if (status.equals("online")) {
                                userInfo.setUserOnline(true);
                            } else {
                                userInfo.setUserOnline(false);
                            }
                            return userInfo;
                        }));
    }
}