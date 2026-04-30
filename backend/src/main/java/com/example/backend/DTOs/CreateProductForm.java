package com.example.backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.codec.multipart.FilePart;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductForm {
    private String title;
    private String description;
    private BigDecimal price;
    private String condition;
    private FilePart photoFirst;
    private FilePart photoSecond;
    private FilePart photoThird;

}
