package com.creatorstudio.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/images")
public class ImageGenerationController {

    @PostMapping("/generate")
    public String generateImage(
            @RequestParam String prompt) {

        return "https://picsum.photos/1024/1024";
    }
}