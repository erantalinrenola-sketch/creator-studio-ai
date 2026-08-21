package com.creatorstudio.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.genai.Client;

@Service
public class ImageStudioService {

    @Value("${gemini.api.key}")
    private String apiKey;

    public String generateImage(String prompt) {

        try {

            System.out.println("=================================");
            System.out.println("IMAGE GENERATION REQUEST");
            System.out.println("Prompt: " + prompt);
            System.out.println("=================================");

            Client client =
                    Client.builder()
                          .apiKey(apiKey)
                          .build();

            String response =
                    client.models.generateContent(
                            "gemini-3.1-flash-lite-image",
                            prompt,
                            null
                    ).text();

            return response;

        } catch (Exception e) {

            e.printStackTrace();

            return "ERROR : " + e.getMessage();
        }
    }
}