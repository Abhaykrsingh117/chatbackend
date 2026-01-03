package com.example.chatbackend.repository;

import com.example.chatbackend.model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {

    List<ChatMessage>
    findBySenderAndReceiverOrReceiverAndSenderOrderByTimestampAsc(
            String sender1,
            String receiver1,
            String sender2,
            String receiver2
    );
}
