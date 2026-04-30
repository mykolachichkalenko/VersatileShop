package com.example.backend.ServicesTest;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

@SpringBootTest
@Testcontainers
public abstract class BaseDBConfig {

    static final PostgreSQLContainer<?> POSTGRES =
            new PostgreSQLContainer<>("pgvector/pgvector:pg16")
                    .withDatabaseName("testdb")
                    .withUsername("test")
                    .withPassword("test");

    static final GenericContainer<?> redis =
            new GenericContainer<>(DockerImageName.parse("redis:7-alpine"))
                    .withExposedPorts(6379);


    static {
        POSTGRES.start();
        redis.start();
    }

    @DynamicPropertySource
    static void configureR2dbc(DynamicPropertyRegistry registry) {
        registry.add("spring.r2dbc.url", () ->
                String.format("r2dbc:postgresql://%s:%d/%s",
                        POSTGRES.getHost(),
                        POSTGRES.getMappedPort(PostgreSQLContainer.POSTGRESQL_PORT),
                        POSTGRES.getDatabaseName())
        );

    }

}