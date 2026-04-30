package com.example.backend.ServicesTest.RedisServicesTest;

import com.example.backend.DTOs.UserProfile;
import com.example.backend.Services.RedisServices.UserCacheService;
import com.example.backend.ServicesTest.BaseDBConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import reactor.test.StepVerifier;

import static org.junit.Assert.assertEquals;

public class UserCacheServiceTest extends BaseDBConfig {

    @Autowired
    private UserCacheService userCacheService;

    @Test
    public void addUserToCacheTest() {
        UserProfile user = new UserProfile();
        user.setId(1L);
        user.setEmail("testAdd@gmail.com");
        user.setName("Test User");
        user.setAvatarUrl("test_avatar_url");

        StepVerifier.create(userCacheService.setValue(user.getEmail(), user))
                .expectNext(true)
                .verifyComplete();
    }

    @Test
    public void getCachedUserTest() {
        UserProfile user = new UserProfile();
        user.setId(2L);
        user.setEmail("testGet@gmail.com");
        user.setName("Test User");
        user.setAvatarUrl("test_avatar_url");

        StepVerifier.create(
                userCacheService.setValue(user.getEmail(), user)
                        .then(userCacheService.getValue(user.getEmail()))
        ).assertNext(u -> {
            assertEquals(user.getId(), u.getId());
            assertEquals(user.getEmail(), u.getEmail());
            assertEquals(user.getName(), u.getName());
            assertEquals(user.getAvatarUrl(), u.getAvatarUrl());
        }).verifyComplete();

    }

    @Test
    public void deleteCachedUserTest() {
        UserProfile user = new UserProfile();
        user.setEmail("testDelete@gmail.com");

        StepVerifier.create(
                        userCacheService.setValue(user.getEmail(), user)
                                .then(userCacheService.deleteValue(user.getEmail()))
                )
                .expectNext(true)
                .verifyComplete();
    }

}
