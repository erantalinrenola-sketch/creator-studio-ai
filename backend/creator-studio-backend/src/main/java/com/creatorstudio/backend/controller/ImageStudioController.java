package com.creatorstudio.backend.controller;

import com.creatorstudio.backend.service.ImageStudioService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/image-studio")
@CrossOrigin(origins = "http://localhost:4200")
public class ImageStudioController {

    private final ImageStudioService imageStudioService;

    public ImageStudioController(
            ImageStudioService imageStudioService) {

        this.imageStudioService =
                imageStudioService;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateImage(
            @RequestBody String prompt) {

        String response =
                imageStudioService.generateImage(prompt);

        return ResponseEntity.ok(response);
    }
}