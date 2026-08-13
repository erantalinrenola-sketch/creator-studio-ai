package com.creatorstudio.backend.controller;

import com.creatorstudio.backend.service.OllamaService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/story")
@CrossOrigin(origins = "http://localhost:4200")
public class StoryController {

    private final OllamaService ollamaService;

    public StoryController(OllamaService ollamaService) {
        this.ollamaService = ollamaService;
    }

    @PostMapping("/generate")
    public String generateScript(@RequestBody StoryRequest request) {

        return ollamaService.generateScript(request.story());
    }

    public record StoryRequest(String story) {
    }
}