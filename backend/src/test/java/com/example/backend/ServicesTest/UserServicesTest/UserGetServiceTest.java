package com.example.backend.ServicesTest.UserServicesTest;


import com.example.backend.DTOs.UserProfile;
import com.example.backend.Services.UserServices.UserCreateService;
import com.example.backend.Services.UserServices.UserGetService;
import com.example.backend.ServicesTest.BaseDBConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import reactor.test.StepVerifier;

import static org.junit.Assert.assertEquals;

public class UserGetServiceTest extends BaseDBConfig {
    @Autowired
    UserGetService userGetService;
    @Autowired
    UserCreateService userCreateService;

    @Test
    void getMyProfileTest(){
        StepVerifier.create(userGetService.getMyProfile(null))
                .expectErrorSatisfies(error -> {
                    ResponseStatusException exception = (ResponseStatusException) error;
                    assert(exception.getStatusCode() == HttpStatus.UNAUTHORIZED);
                })
                .verify();
    }

    @Test
    public void getCreatedUserTest() {
        UserProfile user = new UserProfile();
        user.setName("Test User");
        user.setEmail("testEmailToGet@gmail.com");
        user.setAvatarUrl("http://example.com/avatar.jpg");
        user.setStatus("active");

        StepVerifier.create(
                        userCreateService.createProfile(user)
                                .then(userGetService.getMyProfile("testEmailToGet@gmail.com"))
                )
                .assertNext(u -> {
                    assertEquals("Test User", u.getName());
                    assertEquals("testEmailToGet@gmail.com", u.getEmail());
                    assertEquals("http://example.com/avatar.jpg", u.getAvatarUrl());
                    assertEquals("active", u.getStatus());
                })
                .verifyComplete();

    }

}
