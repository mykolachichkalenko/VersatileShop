package com.example.backend.Services.KafkaServices;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.kafka.sender.KafkaSender;
import reactor.kafka.sender.SenderRecord;

@Service
public class KafkaProducerAIService {

    private final KafkaSender<String, String> sender;

    @Value("${spring.kafka.topic}")
    private String TOPIC;

    public KafkaProducerAIService(KafkaSender<String, String> sender) {
        this.sender = sender;
    }

    public Mono<Void> send(String message) {

        SenderRecord<String, String, String> record =
                SenderRecord.create(TOPIC, null, null, null, message, null);

        return sender.send(Mono.just(record))
                .doOnNext(r -> System.out.println("Sent: " + r.recordMetadata()))
                .then();
    }
}
