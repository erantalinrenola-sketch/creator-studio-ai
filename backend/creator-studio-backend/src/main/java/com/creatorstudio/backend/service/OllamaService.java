package com.creatorstudio.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class OllamaService {

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String OLLAMA_URL =
            "http://localhost:11434/api/generate";

    public String generateScript(String story) {

        String prompt = """
                Create a complete cinematic screenplay from the following story.

                Story:
                %s

                Requirements:
                - Create a suitable title.
                - Divide the story into 5 scenes.
                - For each scene include:
                  1. Location
                  2. Characters
                  3. Action and visual description
                  4. Dialogue
                  5. Emotional tone
                - Keep the characters consistent throughout.
                - Maintain a clear beginning, middle, and ending.
                - Make the screenplay suitable for a short AI-generated film.
                - Return only the screenplay.
                """.formatted(story);

        Map<String, Object> request = new HashMap<>();
        request.put("model", "qwen3:1.7b");
        request.put("prompt", prompt);
        request.put("stream", false);

        Map<String, Object> response =
                restTemplate.postForObject(
                        OLLAMA_URL,
                        request,
                        Map.class
                );

        if (response == null || response.get("response") == null) {
            throw new RuntimeException("No response received from Ollama");
        }

        return response.get("response").toString();
    }
}