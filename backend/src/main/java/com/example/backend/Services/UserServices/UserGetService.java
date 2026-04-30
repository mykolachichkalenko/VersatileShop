package com.example.backend.Services.UserServices;

import com.example.backend.DTOs.UserProfile;
import com.example.backend.Services.RedisServices.UserCacheService;
import org.springframework.http.HttpStatus;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
public class UserGetService {

    private final DatabaseClient databaseClient;
    private final UserCacheService userCacheService;

    public UserGetService(DatabaseClient databaseClient, UserCacheService userCacheService) {
        this.databaseClient = databaseClient;
        this.userCacheService = userCacheService;
    }


    public Mono<UserProfile> getMyProfile(String email) {
        if (email == null || email.isEmpty()) {
            return Mono.error(new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "User is not authenticated"
            ));
        }

        return userCacheService.getValue(email)
                .switchIfEmpty(
                        databaseClient.sql("SELECT * FROM users WHERE email = :email")
                                .bind("email", email)
                                .map(row -> {
                                    UserProfile profile = new UserProfile();
                                    profile.setId(row.get("id", Long.class));
                                    profile.setName(row.get("name", String.class));
                                    profile.setEmail(row.get("email", String.class));
                                    profile.setAvatarUrl(row.get("avatar_url", String.class));
                                    profile.setCity(row.get("city", String.class));
                                    profile.setDepartment(row.get("department", String.class));
                                    profile.setStatus(row.get("status", String.class));
                                    profile.setCreatedAt(row.get("created_at", LocalDateTime.class));

                                    return profile;
                                })
                                .one()
                                .flatMap(user ->
                                        userCacheService.setValue(user.getEmail(), user)
                                                .thenReturn(user)
                                )
                );
    }
}
