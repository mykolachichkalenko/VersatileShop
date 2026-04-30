package com.example.backend.Controllers;

import com.example.backend.Services.CloudinaryServices.CloudinaryImageService;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/file")
public class FileController {

    private final CloudinaryImageService cloudinaryImageService;

    public FileController(CloudinaryImageService cloudinaryImageService) {
        this.cloudinaryImageService = cloudinaryImageService;
    }

    @PostMapping("/createImage/andGetURL")
    public Mono<String> uploadFile(@RequestPart FilePart file){
        return cloudinaryImageService.getURLImage(file);
    }
}
