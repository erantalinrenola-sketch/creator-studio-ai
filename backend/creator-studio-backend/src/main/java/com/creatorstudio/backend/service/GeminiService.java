package com.creatorstudio.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestClient restClient;

    public GeminiService() {
        this.restClient = RestClient.create();
    }

    public String testGemini() {

        String url =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key="
                + apiKey;

        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of(
                                "parts", new Object[]{
                                        Map.of(
                                                "text",
                                                "Reply with exactly: Gemini connection successful"
                                        )
                                }
                        )
                }
        );

        return restClient
                .post()
                .uri(url)
                .body(requestBody)
                .retrieve()
                .body(String.class);
    }

    public String uploadVideoToGemini(
            MultipartFile video) {

        try {

            if (video == null || video.isEmpty()) {

                throw new IllegalArgumentException(
                        "Video file is empty."
                );
            }

            String mimeType =
                    video.getContentType();

            if (mimeType == null ||
                    !mimeType.startsWith("video/")) {

                throw new IllegalArgumentException(
                        "Selected file is not a video."
                );
            }

            String uploadUrl =
                    "https://generativelanguage.googleapis.com/upload/v1beta/files?key="
                    + apiKey;

            Map<String, Object> metadata =
                    Map.of(
                            "file",
                            Map.of(
                                    "display_name",
                                    video.getOriginalFilename()
                            )
                    );

            var startResponse =
                    restClient
                            .post()
                            .uri(uploadUrl)
                            .header(
                                    "X-Goog-Upload-Protocol",
                                    "resumable"
                            )
                            .header(
                                    "X-Goog-Upload-Command",
                                    "start"
                            )
                            .header(
                                    "X-Goog-Upload-Header-Content-Length",
                                    String.valueOf(
                                            video.getSize()
                                    )
                            )
                            .header(
                                    "X-Goog-Upload-Header-Content-Type",
                                    mimeType
                            )
                            .header(
                                    "Content-Type",
                                    "application/json"
                            )
                            .body(metadata)
                            .retrieve()
                            .toBodilessEntity();

            String resumableUploadUrl =
                    startResponse
                            .getHeaders()
                            .getFirst(
                                    "X-Goog-Upload-URL"
                            );

            if (resumableUploadUrl == null ||
                    resumableUploadUrl.isBlank()) {

                throw new RuntimeException(
                        "Gemini upload URL was not returned."
                );
            }

            String fileResponse =
                    restClient
                            .post()
                            .uri(resumableUploadUrl)
                            .header(
                                    "Content-Length",
                                    String.valueOf(
                                            video.getSize()
                                    )
                            )
                            .header(
                                    "X-Goog-Upload-Offset",
                                    "0"
                            )
                            .header(
                                    "X-Goog-Upload-Command",
                                    "upload, finalize"
                            )
                            .body(video.getBytes())
                            .retrieve()
                            .body(String.class);

            System.out.println(
                    "Gemini File Upload Response:"
            );

            System.out.println(fileResponse);

            return waitForVideoReady(fileResponse);

        } catch (RestClientResponseException e) {

            System.err.println(
                    "Gemini API Error:"
            );

            System.err.println(
                    e.getResponseBodyAsString()
            );

            throw new RuntimeException(
                    "Gemini video upload failed: "
                    + e.getResponseBodyAsString(),
                    e
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Gemini video upload failed: "
                    + e.getMessage(),
                    e
            );
        }
    }

    private String waitForVideoReady(
            String fileResponse) {

        String fileName =
                extractFileName(fileResponse);

        if (fileName == null ||
                fileName.isBlank()) {

            throw new RuntimeException(
                    "Could not find Gemini file name."
            );
        }

        String statusUrl =
                "https://generativelanguage.googleapis.com/v1beta/"
                + fileName
                + "?key="
                + apiKey;

        for (int attempt = 0; attempt < 30; attempt++) {

            try {

                String statusResponse =
                        restClient
                                .get()
                                .uri(statusUrl)
                                .retrieve()
                                .body(String.class);

                System.out.println(
                        "Gemini Video Status:"
                );

                System.out.println(
                        statusResponse
                );

                if (statusResponse.contains(
                        "\"state\": \"ACTIVE\"")) {

                    return statusResponse;
                }

                if (statusResponse.contains(
                        "\"state\": \"FAILED\"")) {

                    throw new RuntimeException(
                            "Gemini video processing failed."
                    );
                }

                Thread.sleep(2000);

            } catch (InterruptedException e) {

                Thread.currentThread().interrupt();

                throw new RuntimeException(
                        "Video processing was interrupted.",
                        e
                );
            }
        }

        throw new RuntimeException(
                "Gemini video processing timed out."
        );
    }

    public String analyzeVideo(String fileName) {

    String url =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key="
            + apiKey;

    String prompt = """
            Analyze this video for YouTube optimization.

            Watch and understand the complete video.

            Return the following:

            1. Video Summary
            2. Language
            3. Main Topic
            4. Emotion / Mood
            5. Target Audience
            6. Opening Hook
            7. Three Recommended YouTube Titles
            8. YouTube Description
            9. Keywords
            10. Hashtags
            11. Thumbnail Idea
            12. Improvement Suggestions

            Important:
            - Base your recommendations only on what is actually present in the video.
            - If dialogue is present, consider the dialogue.
            - Consider the visual story, characters, emotions and context.
            - Optimize for YouTube without making false claims.
            - Return clear, practical recommendations.
            """;

    Map<String, Object> requestBody =
            Map.of(
                    "contents",
                    new Object[]{
                            Map.of(
                                    "parts",
                                    new Object[]{
                                            Map.of(
                                                    "text",
                                                    prompt
                                            ),
                                            Map.of(
                                                    "file_data",
                                                    Map.of(
                                                            "mime_type",
                                                            "video/mp4",
                                                            "file_uri",
                                                            "https://generativelanguage.googleapis.com/v1beta/"
                                                                    + fileName
                                                    )
                                            )
                                    }
                            )
                    }
            );

    int maxAttempts = 4;

    for (int attempt = 1; attempt <= maxAttempts; attempt++) {

        try {

            System.out.println(
                    "Gemini analysis attempt "
                            + attempt
                            + " of "
                            + maxAttempts
            );

            return restClient
                    .post()
                    .uri(url)
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

        } catch (RestClientResponseException e) {

            int statusCode =
                    e.getStatusCode().value();

            System.err.println(
                    "Gemini analysis error: HTTP "
                            + statusCode
            );

            if (statusCode != 503 ||
                    attempt == maxAttempts) {

                throw new RuntimeException(
                        "Gemini video analysis failed: "
                                + e.getResponseBodyAsString(),
                        e
                );
            }

            try {

                long waitTime =
                        (long) Math.pow(2, attempt) * 1000;

                System.out.println(
                        "Gemini is temporarily busy. "
                                + "Retrying in "
                                + (waitTime / 1000)
                                + " seconds..."
                );

                Thread.sleep(waitTime);

            } catch (InterruptedException interruptedException) {

                Thread.currentThread().interrupt();

                throw new RuntimeException(
                        "Gemini retry was interrupted.",
                        interruptedException
                );
            }
        }
    }

    throw new RuntimeException(
            "Gemini video analysis failed after retries."
    );
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