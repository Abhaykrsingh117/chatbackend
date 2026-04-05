package com.example.chatbackend.controller;

import com.example.chatbackend.service.UserPresenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class PresenceController {

    @Autowired
    private UserPresenceService presenceService;

    @MessageMapping("/presence/online")
    public void userOnline(String username) {
        presenceService.userOnline(username);
        System.out.println("ONLINE: " + username);
    }

    @MessageMapping("/presence/offline")
    public void userOffline(String username) {
        presenceService.userOffline(username);
        System.out.println("OFFLINE: " + username);
    }
}
