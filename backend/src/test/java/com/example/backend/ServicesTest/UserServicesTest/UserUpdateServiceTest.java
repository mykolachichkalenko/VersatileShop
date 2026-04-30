package com.example.backend.ServicesTest.UserServicesTest;

import com.example.backend.DTOs.UserProfile;
import com.example.backend.Services.UserServices.UserCreateService;
import com.example.backend.Services.UserServices.UserGetService;
import com.example.backend.Services.UserServices.UserUpdateService;
import com.example.backend.ServicesTest.BaseDBConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import reactor.test.StepVerifier;

import static org.junit.Assert.assertEquals;

public class UserUpdateServiceTest extends BaseDBConfig {
    @Autowired
    UserUpdateService userUpdateService;
    @Autowired
    UserCreateService userCreateService;
    @Autowired
    UserGetService userGetService;

    @Test
    public void testUpdateDepartment() {
        UserProfile userProfile = new UserProfile();
        userProfile.setId(1L);
        userProfile.setAvatarUrl("fdsfds");
        userProfile.setStatus("active");
        userProfile.setEmail("test@email.comdsa");
        userProfile.setName("John Doe");
        userProfile.setDepartment("IT");
        userProfile.setCity("New York");

        StepVerifier.create(userCreateService.createProfile(userProfile)
                        .then(userUpdateService.updateDepartment(userProfile.getEmail(), "New City", "New Department"))
                                .then(userGetService.getMyProfile(userProfile.getEmail())))
                .assertNext(updatedProfile -> {
                    assertEquals("New City", updatedProfile.getCity());
                    assertEquals("New Department", updatedProfile.getDepartment());
                }).verifyComplete();

    }

    @Test
    public void testUpdateName(){
        UserProfile userProfile = new UserProfile();
        userProfile.setAvatarUrl("fdsfds");
        userProfile.setStatus("active");
        userProfile.setEmail("test@[ewqkdsa.com");
        userProfile.setName("John Doe");

        StepVerifier.create(userCreateService.createProfile(userProfile)
                        .then(userUpdateService.updateName(userProfile.getEmail(), "Jane Smith"))
                                .then(userGetService.getMyProfile(userProfile.getEmail())))
                .assertNext(updatedProfile -> {
                    assertEquals("Jane Smith", updatedProfile.getName());
                }).verifyComplete();
    }
}