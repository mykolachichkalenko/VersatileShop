package com.example.backend.Services.UserServices;

import com.example.backend.DTOs.UserProfile;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserCreateService {

    private final DatabaseClient databaseClient;

    public UserCreateService(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }


    public Mono<Boolean> createProfile(UserProfile myProfile) {
        String existsSql = "SELECT COUNT(*) AS cnt FROM users WHERE email = :email";

        return databaseClient.sql(existsSql)
                .bind("email", myProfile.getEmail())
                .map((row, metadata) -> row.get("cnt", Long.class))
                .one()
                .flatMap(count ->{
                    if(count != null && count > 0){
                        return Mono.just(false);
                    }

                        String insertSQL = "INSERT INTO users (name,email,avatar_url,status) VALUES (:name, :email, :avatarUrl, :status)";

                        return databaseClient.sql(insertSQL)
                                .bind("name", myProfile.getName())
                                .bind("email", myProfile.getEmail())
                                .bind("avatarUrl", myProfile.getAvatarUrl())
                                .bind("status", myProfile.getStatus())
                                .fetch()
                                .rowsUpdated()
                                .map(rowsUpdated -> rowsUpdated > 0);

                })
                .onErrorResume(error -> Mono.just(false));

    }
}
