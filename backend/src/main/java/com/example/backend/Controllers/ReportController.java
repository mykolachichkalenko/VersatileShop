package com.example.backend.Controllers;

import com.example.backend.Services.ReportServices.CreateProductReport;
import com.example.backend.Services.ReportServices.CreateUserReport;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {


    private final CreateProductReport createProductReport;
    private final CreateUserReport createUserReport;

    public ReportController(CreateProductReport createProductReport, CreateUserReport createUserReport) {
        this.createProductReport = createProductReport;
        this.createUserReport = createUserReport;
    }

    @PostMapping("/product/create")
    public Mono<Void> createProductReport(@RequestBody Map map, @AuthenticationPrincipal OAuth2User user) {
        String reporterEmail = user.getAttribute("email");
        Long productId = ((Number) map.get("productId")).longValue();
        String reason = (String) map.get("reason");

        return createProductReport.create(reporterEmail, productId, reason);
    }

    @PostMapping("/user/create")
    public Mono<Void> createUserReport(@RequestBody Map map, @AuthenticationPrincipal OAuth2User user) {
        String reporterEmail = user.getAttribute("email");
        String reportedUserEmail = (String) map.get("reportedUserEmail");
        String reason = (String) map.get("reason");

        return createUserReport.create(reportedUserEmail, reason, reporterEmail);

    }
}
