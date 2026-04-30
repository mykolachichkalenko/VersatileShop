package com.example.backend.Services.ReportServices;

import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class CreateUserReport {


    private final DatabaseClient databaseClient;

    public CreateUserReport(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    public Mono<Void> create(String reportedUserEmail, String reason, String reporterEmail) {
        String sql = "INSERT INTO user_reports (reporter_id,reported_id,message) VALUES ((SELECT id FROM users WHERE email = :reporterEmail),(SELECT id FROM users WHERE email = :reportedUserEmail),:reason)";
        System.out.println("Creating user report: reporterEmail=" + reporterEmail + ", reportedUserEmail=" + reportedUserEmail + ", reason=" + reason);
        return databaseClient.sql(sql)
                .bind("reporterEmail", reporterEmail)
                .bind("reportedUserEmail", reportedUserEmail)
                .bind("reason", reason)
                .fetch()
                .rowsUpdated()
                .then();
    }
}
