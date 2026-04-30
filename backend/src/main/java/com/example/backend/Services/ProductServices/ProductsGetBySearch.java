package com.example.backend.Services.ProductServices;

import com.example.backend.DTOs.ProductResponse;
import com.example.backend.DTOs.SearchFilters;
import com.example.backend.Services.AiServices.EmbeddingService;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.xml.crypto.Data;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductsGetBySearch {
    private final Integer LIMIT = 30;
    private final DatabaseClient databaseClient;
    private final EmbeddingService embeddingService;

    public ProductsGetBySearch(DatabaseClient databaseClient, EmbeddingService embeddingService) {
        this.databaseClient = databaseClient;
        this.embeddingService = embeddingService;
    }

    public Flux<ProductResponse> getProductsBySearch(
            String searchText,
            List<Long> excludedIds,
            SearchFilters filters,
            String email
    ) {
        return embeddingService.embedTextWithCache(searchText)
                .flatMapMany(vector ->
                        getTransformedSQLGeneric(filters, email, excludedIds, vector)
                                .flatMapMany(spec ->
                                        spec.map((row, meta) -> {
                                                    ProductResponse pr = new ProductResponse();
                                                    pr.setId(row.get("id", Long.class));
                                                    pr.setTitle(row.get("title", String.class));
                                                    pr.setPrice(row.get("price", java.math.BigDecimal.class));
                                                    pr.setPhotoFirst(row.get("photo_1", String.class));
                                                    pr.setCondition(row.get("condition", String.class));
                                                    return pr;
                                                })
                                                .all()
                                )
                );
    }


    private Mono<DatabaseClient.GenericExecuteSpec> getTransformedSQLGeneric(SearchFilters filters, String email, List<Long> excludedIds, Double[] vector) {
        String additionalConditions = "";
        if (filters.getCondition().equals("new")) {
            additionalConditions = " AND condition = 'new' ";
        } else if (filters.getCondition().equals("used")) {
            additionalConditions = " AND condition = 'used' ";
        }

        String additionalSorting = " dist ASC";
        if (filters.getShowNewProducts()) {
            additionalSorting = " dist ASC, created_at DESC";
        }

        String additionalExclusions = " AND NOT (id = ANY(CAST(:excludedIds AS bigint[])))";
        if (excludedIds.isEmpty()) {
            additionalExclusions = "";
        }

        String sql = """ 
                SELECT id, title, price, photo_1, condition,
                    (vector <=> CAST(:queryVector AS vector)) AS dist
                    FROM products
                    WHERE owner_email <> :email
                    AND (vector <=> CAST(:queryVector AS vector)) < :maxDistance
                """ + additionalExclusions + """
                    AND price >= :minPrice
                    AND price <= :maxPrice
                """ + additionalConditions + """
                ORDER BY """ + additionalSorting + """
                
                LIMIT :limit;
                """;

        DatabaseClient.GenericExecuteSpec spec = databaseClient.sql(sql)
                .bind("queryVector", vectorToString(vector))
                .bind("email", email)
                .bind("maxDistance", filters.getVectorDistance())
                .bind("minPrice", filters.getFromPrice())
                .bind("maxPrice", filters.getToPrice())
                .bind("limit", LIMIT);

        if (excludedIds.isEmpty()) {
            return Mono.just(spec);
        }

        spec = spec.bind("excludedIds", excludedIds.toArray(new Long[0]));
        return Mono.just(spec);
    }

    private String vectorToString(Double[] vector) {
        return "[" + Arrays.stream(vector)
                .map(d -> String.format(Locale.US, "%s", d))
                .collect(Collectors.joining(",")) + "]";
    }

}
