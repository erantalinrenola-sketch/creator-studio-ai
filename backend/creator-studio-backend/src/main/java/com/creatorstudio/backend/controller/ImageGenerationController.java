package com.creatorstudio.backend.controller;

import com.openai.client.OpenAIClient;
import com.openai.models.images.ImageGenerateParams;
import com.openai.models.images.ImageModel;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/images")
public class ImageGenerationController {

    private final OpenAIClient openAIClient;

    public ImageGenerationController(OpenAIClient openAIClient) {
        this.openAIClient = openAIClient;
    }

    @PostMapping("/generate")
    public String generateImage(
            @RequestParam String prompt) {

        ImageGenerateParams params =
                ImageGenerateParams.builder()
                        .prompt(prompt)
                        .model(ImageModel.GPT_IMAGE_1)
                        .size(ImageGenerateParams.Size._1024X1024)
                        .n(1L)
                        .build();

        var response =
                openAIClient.images().generate(params);

        return response.data()
                .orElseThrow()
                .get(0)
                .url()
                .orElseThrow();
    }
}