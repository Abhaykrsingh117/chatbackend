package com.example.chatbackend.controller;

import com.example.chatbackend.model.ChatMessage;
import com.example.chatbackend.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin
public class ChatHistoryController {

    @Autowired
    private ChatMessageRepository repository;

    @GetMapping("/history")
    public List<ChatMessage> getChatHistory(
            @RequestParam String user1,
            @RequestParam String user2
    ) {
        return repository
                .findBySenderAndReceiverOrReceiverAndSenderOrderByTimestampAsc(
                        user1, user2,
                        user2, user1
                );
    }
}
