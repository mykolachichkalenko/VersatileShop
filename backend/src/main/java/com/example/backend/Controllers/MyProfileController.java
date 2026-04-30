package com.example.backend.Controllers;

import com.example.backend.DTOs.UserProfile;
import com.example.backend.Services.RedisServices.UserStatusService;
import com.example.backend.Services.UserServices.UserCreateService;
import com.example.backend.Services.UserServices.UserGetService;
import com.example.backend.Services.UserServices.UserUpdateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class MyProfileController {

    private final UserGetService userGetService;
    private final UserCreateService userCreateService;
    private final UserUpdateService userUpdateService;
    private final UserStatusService userStatusService;

    public MyProfileController(UserGetService userGetService, UserCreateService userCreateService, UserUpdateService userUpdateService, UserStatusService userStatusService) {
        this.userGetService = userGetService;
        this.userCreateService = userCreateService;
        this.userUpdateService = userUpdateService;
        this.userStatusService = userStatusService;
    }

    @GetMapping("/get/my-profile")
    public Mono<UserProfile> getMyProfile(@AuthenticationPrincipal OAuth2User user) {
        if (user == null) {
            return Mono.error(new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "User is not authenticated"
            ));
        }
        return userGetService.getMyProfile(user.getAttribute("email"));
    }

    @GetMapping("/get/my/email")
    public Mono<String> getMyEmail(@AuthenticationPrincipal OAuth2User user) {
        if (user == null) {
            return Mono.just("null");
        }
        return Mono.just(user.getAttribute("email"));
    }

    @PostMapping("/create/my-profile")
    public Mono<Boolean> createMyProfile(@AuthenticationPrincipal OAuth2User user) {
        UserProfile myProfile = new UserProfile();
        myProfile.setName(user.getAttribute("name"));
        myProfile.setEmail(user.getAttribute("email"));
        myProfile.setAvatarUrl(user.getAttribute("picture"));
        myProfile.setStatus("active");

        return userCreateService.createProfile(myProfile);
    }

    @PostMapping("/change-avatar")
    public Mono<String> changeAvatar(@RequestPart("avatar") FilePart file, @AuthenticationPrincipal OAuth2User user) {
        return userUpdateService.updateAvatar(user.getAttribute("email"), file);
    }

    @PostMapping("/change-name")
    public Mono<String> changeName(@RequestBody Map map, @AuthenticationPrincipal OAuth2User user) {
        System.out.println(map.get("name").toString());
        return userUpdateService.updateName(user.getAttribute("email"), map.get("name").toString());
    }

    @PostMapping("/change-department")
    public Mono<String> changeDepartment(@RequestBody Map map, @AuthenticationPrincipal OAuth2User user) {
        return userUpdateService.updateDepartment(user.getAttribute("email"), map.get("city").toString(), map.get("department").toString());
    }

    @PostMapping("/change-status")
    public Mono<Void> changeStatus(@AuthenticationPrincipal OAuth2User user) {
        if (user == null) {
            return Mono.empty();
        }
        return userStatusService.setStatus(user.getAttribute("email"));
    }
}
