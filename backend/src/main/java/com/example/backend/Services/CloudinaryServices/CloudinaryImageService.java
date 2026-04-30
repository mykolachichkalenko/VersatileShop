package com.example.backend.Services.CloudinaryServices;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class CloudinaryImageService {
    private final Cloudinary cloudinary;

    public CloudinaryImageService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public Mono<String> getURLImage(FilePart image){
        return DataBufferUtils.join(image.content())
                .flatMap(dataBuffer -> {
                    byte[] bytes = new byte[dataBuffer.readableByteCount()];
                    dataBuffer.read(bytes);
                    DataBufferUtils.release(dataBuffer);

                    return Mono.fromCallable(() -> {
                        Map uploadResult = cloudinary.uploader().upload(bytes, ObjectUtils.emptyMap());
                        return uploadResult.get("secure_url").toString();
                    });
                });
    }
}
