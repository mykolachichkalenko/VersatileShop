package com.example.backend.Services.UserServices;

import com.example.backend.Services.CloudinaryServices.CloudinaryImageService;
import com.example.backend.Services.RedisServices.UserCacheService;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserUpdateService {

    private final CloudinaryImageService cloudinaryImageService;
    private final DatabaseClient databaseClient;
    private final UserCacheService userCacheService;

    public UserUpdateService(CloudinaryImageService cloudinaryImageService, DatabaseClient databaseClient, UserCacheService userCacheService) {
        this.cloudinaryImageService = cloudinaryImageService;
        this.databaseClient = databaseClient;
        this.userCacheService = userCacheService;
    }

    public Mono<String> updateAvatar(String email, FilePart image){
        return cloudinaryImageService.getURLImage(image)
                .flatMap(url ->
                        databaseClient.sql("UPDATE users SET avatar_url = :url WHERE email = :email")
                                .bind("url", url)
                                .bind("email", email)
                                .fetch()
                                .rowsUpdated()
                                .flatMap(row -> userCacheService.deleteValue(email))
                                .then()
                                .thenReturn(url)
                );
    }

    public Mono<String> updateName(String email, String name){
        return databaseClient.sql("UPDATE users SET name = :name WHERE email = :email")
                .bind("name", name)
                .bind("email", email)
                .fetch()
                .rowsUpdated()
                .flatMap(row -> userCacheService.deleteValue(email))
                .then()
                .thenReturn(name);
    }

    public Mono<String> updateDepartment(String email,String city,String department){
        return databaseClient.sql("UPDATE users SET city = :city, department = :department WHERE email = :email")
                .bind("city", city)
                .bind("department", department)
                .bind("email", email)
                .fetch()
                .rowsUpdated()
                .flatMap(row -> userCacheService.deleteValue(email))
                .then()
                .thenReturn(department);
    }
}
