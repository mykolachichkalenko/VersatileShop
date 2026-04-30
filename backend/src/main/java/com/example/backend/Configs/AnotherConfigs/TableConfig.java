package com.example.backend.Configs.AnotherConfigs;

import jakarta.annotation.PostConstruct;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Component;

@Component
public class TableConfig {

    private final DatabaseClient databaseClient;

    public TableConfig(DatabaseClient databaseClient) {
        this.databaseClient = databaseClient;
    }

    @PostConstruct
    public void init() {

        databaseClient.sql("""
                    CREATE TABLE IF NOT EXISTS users (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(100) NOT NULL,
                        email VARCHAR(150) NOT NULL UNIQUE,
                        avatar_url TEXT NOT NULL,
                        city VARCHAR(100),
                        department VARCHAR(100),
                        status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'banned')),
                        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                    );
                """).fetch().rowsUpdated().block();

        databaseClient.sql("""
                        CREATE EXTENSION IF NOT EXISTS vector;
                
                        CREATE TABLE IF NOT EXISTS products(
                            id BIGSERIAL PRIMARY KEY,
                            owner_email VARCHAR(150) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
                            title VARCHAR(94) NOT NULL,
                            description TEXT NOT NULL,
                            price NUMERIC(10,2) NOT NULL CHECK(price >= 0),
                            condition VARCHAR(20) NOT NULL,
                            status VARCHAR(20) NOT NULL,
                            vector vector(1536) NOT NULL,
                            photo_1 TEXT NOT NULL,
                            photo_2 TEXT,
                            photo_3 TEXT,
                            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);
                """).fetch().rowsUpdated().block();

        databaseClient.sql("""
                                CREATE TABLE IF NOT EXISTS likes(
                                    id BIGSERIAL PRIMARY KEY,
                                    user_email VARCHAR(150) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
                                    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
                                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                    CONSTRAINT uq_user_product UNIQUE (user_email, product_id)
                                );
                """).fetch().rowsUpdated().block();

        databaseClient.sql("""
                            CREATE TABLE IF NOT EXISTS product_reviews ( 
                                id BIGSERIAL PRIMARY KEY,
                                user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                                product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
                                rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
                                message TEXT NOT NULL,
                                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                CONSTRAINT uq_review_user_product UNIQUE (user_id, product_id)
                                );
                """).fetch().rowsUpdated().block();

        databaseClient.sql("""
                            CREATE TABLE IF NOT EXISTS product_reports (
                                id BIGSERIAL PRIMARY KEY,
                                reporter_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                                product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
                                message TEXT NOT NULL,
                                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                            );
                """).fetch().rowsUpdated().block();

        databaseClient.sql("""
                CREATE TABLE IF NOT EXISTS user_reviews(
                    id BIGSERIAL PRIMARY KEY,
                    reviewer_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    reviewed_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
                    message TEXT NOT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT uq_review_user UNIQUE (reviewer_id, reviewed_user_id)
                );
                """).fetch().rowsUpdated().block();

        databaseClient.sql("""
                CREATE TABLE IF NOT EXISTS user_reports (
                    id BIGSERIAL PRIMARY KEY,
                    reporter_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    reported_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    message TEXT NOT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT chk_user_reports_not_same CHECK (reporter_id <> reported_id)
                );
                """).fetch().rowsUpdated().block();

        databaseClient.sql("""
                        CREATE TABLE IF NOT EXISTS blocks(
                            id BIGSERIAL PRIMARY KEY,
                            blocker_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                            blocked_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            CONSTRAINT uq_blocker_blocked UNIQUE (blocker_id, blocked_id)
                        );
                """).fetch().rowsUpdated().block();

        databaseClient.sql("""
                            CREATE TABLE IF NOT EXISTS chats (
                                      id BIGSERIAL PRIMARY KEY,
                                      user1_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                                      user2_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                                      shard INTEGER NOT NULL,
                                      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                      CONSTRAINT chk_chats_users_not_same CHECK (user1_id <> user2_id)
                                  );
                
                                  CREATE UNIQUE INDEX IF NOT EXISTS ux_chats_user_pair
                                      ON chats (
                                          LEAST(user1_id, user2_id),
                                          GREATEST(user1_id, user2_id)
                                      );
                """).fetch().rowsUpdated().block();

        databaseClient.sql("""
                CREATE TABLE IF NOT EXISTS user_chat_unread_messages (
                  chat_id      BIGINT NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
                  user_id      BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                  unread_count INT    NOT NULL DEFAULT 0 CHECK (unread_count >= 0),
                  PRIMARY KEY (chat_id, user_id)
                );
                """).fetch().rowsUpdated().block();


        for (int i = 0; i < 5; i++) {
            String tableName = "messages_" + i;

            databaseClient.sql("""
                            CREATE TABLE IF NOT EXISTS %s (
                                id BIGSERIAL PRIMARY KEY,
                                temporary_id TEXT NOT NULL,
                                chat_id BIGINT NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
                                sender_id BIGINT NOT NULL REFERENCES users(id),
                                recipient_id BIGINT NOT NULL REFERENCES users(id),
                                content TEXT NOT NULL,
                                is_read BOOLEAN NOT NULL DEFAULT false,
                                type TEXT NOT NULL,
                                created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                CHECK (sender_id <> recipient_id),
                                CHECK (type IN ('text', 'image'))
                            );
                            """.formatted(tableName))
                    .then()
                    .block();

            databaseClient.sql("""
                            CREATE UNIQUE INDEX IF NOT EXISTS ux_%s_sender_temporary
                                ON %s (sender_id, temporary_id);
                            """.formatted(tableName, tableName))
                    .then()
                    .block();

            databaseClient.sql("""
                            CREATE INDEX IF NOT EXISTS idx_%s_chat_id_id_desc
                                ON %s (chat_id, id DESC);
                            """.formatted(tableName, tableName))
                    .then()
                    .block();

            databaseClient.sql("""
                            CREATE INDEX IF NOT EXISTS idx_%s_recipient_id
                                ON %s (recipient_id);
                            """.formatted(tableName, tableName))
                    .then()
                    .block();
        }
    }
}