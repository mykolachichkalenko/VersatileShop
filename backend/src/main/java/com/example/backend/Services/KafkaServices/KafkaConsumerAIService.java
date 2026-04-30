package com.example.backend.Services.KafkaServices;

import com.example.backend.Services.AiServices.CreateProductWithAI;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.kafka.receiver.KafkaReceiver;

@Service
@RequiredArgsConstructor
public class KafkaConsumerAIService {

    private final KafkaReceiver<String, String> receiver;
    private final CreateProductWithAI createProductWithAI;

    @PostConstruct
    public void start() {

        receiver.receive()
                .flatMap(record ->
                        createProductWithAI.create(record.value())
                                .then(Mono.fromRunnable(() ->
                                                record.receiverOffset().acknowledge()
                                        )
                                )
                )
                .doOnError(err -> System.err.println("Kafka error: " + err))
                .subscribe();
    }
}
