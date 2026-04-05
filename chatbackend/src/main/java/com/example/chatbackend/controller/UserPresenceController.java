package com.example.chatbackend.controller;

import com.example.chatbackend.service.UserPresenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/presence")
@CrossOrigin("*")
public class UserPresenceController {

    @Autowired
    private UserPresenceService presenceService;

    @GetMapping("/online")
    public Set<String> getOnlineUsers() {
        return presenceService.getOnlineUsers();
    }
}
