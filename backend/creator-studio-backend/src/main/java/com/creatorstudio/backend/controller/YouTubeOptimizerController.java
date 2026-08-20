package com.creatorstudio.backend.controller;

import com.creatorstudio.backend.service.GeminiService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/youtube-optimizer")
@CrossOrigin(origins = "http://localhost:4200")
public class YouTubeOptimizerController {

    private final GeminiService geminiService;

    public YouTubeOptimizerController(
            GeminiService geminiService) {

        this.geminiService = geminiService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadVideo(
            @RequestParam("video") MultipartFile video,
            @RequestParam("projectIndex") int projectIndex) {

        if (video == null || video.isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("Please select a video file.");
        }

        System.out.println(
                "YouTube Optimizer - Video Received"
        );

        System.out.println(
                "Project Index: " + projectIndex
        );

        System.out.println(
                "File Name: " + video.getOriginalFilename()
        );

        System.out.println(
                "File Size: " + video.getSize()
        );

        /*
         * Upload video to Gemini
         * and wait until the file becomes ACTIVE.
         */
        String geminiFileResponse =
                geminiService.uploadVideoToGemini(video);

        System.out.println(
                "Gemini File Ready:"
        );

        System.out.println(
                geminiFileResponse
        );

        /*
         * Extract the Gemini file name.
         *
         * Example:
         * files/04i8ukn2bxtu
         */
        String fileName =
                extractFileName(geminiFileResponse);

        if (fileName == null) {

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "Gemini file name could not be found."
                    );
        }

        /*
         * Now ask Gemini to analyze the video.
         */
        String analysis =
                geminiService.analyzeVideo(
                        fileName
                );

        System.out.println(
                "Gemini Video Analysis:"
        );

        System.out.println(
                analysis
        );

        return ResponseEntity.ok(
                analysis
        );
    }

    @GetMapping("/gemini-test")
    public ResponseEntity<String> testGemini() {

        String response =
                geminiService.testGemini();

        return ResponseEntity.ok(response);
    }

    private String extractFileName(
            String response) {

        String searchText =
                "\"name\": \"files/";

        int start =
                response.indexOf(searchText);

        if (start == -1) {
            return null;
        }

        start += 9;

        int end =
                response.indexOf(
                        "\"",
                        start
                );

        if (end == -1) {
            return null;
        }

        return response.substring(
                start,
                end
        );
    }

}