package com.example.backend.DTOs;

import lombok.Data;

import java.util.List;

@Data
public class SearchRequest {
    private String searchText;
    private List<Long> excludedIds;
    private SearchFilters filters;
}

