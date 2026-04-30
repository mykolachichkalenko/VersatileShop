package com.example.backend.Services.ReportServices;

import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class CreateProductReport {


    private final DatabaseClient databaseClient;

    public CreateProductReport(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    public Mono<Void> create(String reporterEmail, Long productId, String reason){
        String sql = "INSERT INTO product_reports (reporter_id,product_id,message) VALUES ((SELECT id FROM users WHERE email = :reporterEmail),:productId,:reason)";

        return databaseClient.sql(sql)
                .bind("reporterEmail", reporterEmail)
                .bind("productId", productId)
                .bind("reason", reason)
                .fetch()
                .rowsUpdated()
                .then();
    }
}
