package com.example.backend.ServicesTest.UserServicesTest;

import com.example.backend.DTOs.UserProfile;
import com.example.backend.Services.UserServices.UserCreateService;
import com.example.backend.Services.UserServices.UserGetService;
import com.example.backend.ServicesTest.BaseDBConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import reactor.test.StepVerifier;

import java.util.UUID;

import static org.junit.Assert.assertEquals;

public class UserCreateServiceTest extends BaseDBConfig {
    @Autowired
    private UserCreateService userCreateService;


    @Test
    public void createProfileTest() {
        UserProfile myProfile = new UserProfile();
        myProfile.setName("Test User");
        myProfile.setEmail("tested@gmail.com");
        myProfile.setAvatarUrl("http://example.com/avatar.jpg");
        myProfile.setStatus("active");

        StepVerifier.create(userCreateService.createProfile(myProfile))
                .expectNext(true)
                .verifyComplete();

        StepVerifier.create(userCreateService.createProfile(myProfile))
                .expectNext(false)
                .verifyComplete();
    }


}
