import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-youtube-optimizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './youtube-optimizer.html',
  styleUrl: './youtube-optimizer.scss',
})
export class YouTubeOptimizer implements OnInit {

  projectIndex = -1;

  project: any = null;

  selectedVideo: File | null = null;

  videoName = '';

  videoSize = '';

  videoPreviewUrl = '';

  isUploading = false;

  uploadMessage = '';

  // Gemini analysis
  analysis = '';

  analysisAvailable = false;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private http: HttpClient
  ) {}

  ngOnInit() {

    this.projectIndex = Number(
      this.route.snapshot.paramMap.get('index')
    );

    const projects =
      this.projectService.getProjects();

    if (projects[this.projectIndex]) {

      this.project =
        projects[this.projectIndex];

    }

    console.log(
      'YouTube Optimizer Project:',
      this.project
    );
  }


  selectVideo(event: Event) {

    const input =
      event.target as HTMLInputElement;

    if (!input.files ||
        input.files.length === 0) {

      return;
    }

    const file =
      input.files[0];

    if (!file.type.startsWith('video/')) {

      alert('Please select a valid video file.');

      input.value = '';

      return;
    }

    this.selectedVideo = file;

    this.videoName =
      file.name;

    this.videoSize =
      this.formatFileSize(file.size);

    if (this.videoPreviewUrl) {

      URL.revokeObjectURL(
        this.videoPreviewUrl
      );
    }

    this.videoPreviewUrl =
      URL.createObjectURL(file);

    this.uploadMessage = '';

    this.analysis = '';

    this.analysisAvailable = false;

    console.log(
      'Selected Video:',
      file
    );
  }


  removeVideo() {

    if (this.videoPreviewUrl) {

      URL.revokeObjectURL(
        this.videoPreviewUrl
      );
    }

    this.selectedVideo = null;

    this.videoName = '';

    this.videoSize = '';

    this.videoPreviewUrl = '';

    this.uploadMessage = '';

    this.analysis = '';

    this.analysisAvailable = false;
  }


  analyzeVideo() {

    console.log(
      'ANALYZE VIDEO BUTTON CLICKED'
    );

    if (!this.project) {

      alert('Project not found.');

      return;
    }

    if (!this.selectedVideo) {

      alert('Please select a video first.');

      return;
    }

    this.isUploading = true;

    this.analysis = '';

    this.analysisAvailable = false;

    this.uploadMessage =
      'Uploading video and analyzing with Gemini...';

    const formData =
      new FormData();

    formData.append(
      'video',
      this.selectedVideo
    );

    formData.append(
      'projectIndex',
      this.projectIndex.toString()
    );


    this.http.post(
      'http://localhost:8080/api/youtube-optimizer/upload',
      formData,
      {
        responseType: 'text'
      }
    ).subscribe({

      next: (response: string) => {

        console.log(
          '========== GEMINI RESPONSE RECEIVED =========='
        );

        console.log(response);

        console.log(
          '=============================================='
        );


        /*
         * Stop loading immediately.
         */
        this.isUploading = false;


        /*
         * Extract actual Gemini text.
         */
        const result =
          this.extractGeminiText(response);


        console.log(
          'Extracted Gemini Analysis:',
          result
        );


        /*
         * Store result for Angular UI.
         */
        this.analysis =
          result;


        /*
         * Show analysis section.
         */
        this.analysisAvailable =
          result.trim().length > 0;


        if (this.analysisAvailable) {

          this.uploadMessage =
            'Video analyzed successfully.';

        } else {

          this.uploadMessage =
            'Gemini returned an empty analysis.';
        }

      },


      error: (error) => {

        console.error(
          '========== VIDEO ANALYSIS FAILED =========='
        );

        console.error(error);

        console.error(
          '==========================================='
        );


        this.isUploading = false;

        this.analysis = '';

        this.analysisAvailable = false;

        this.uploadMessage =
          'Video analysis failed. Please check the backend.';
      },


      complete: () => {

        console.log(
          'Gemini analysis HTTP request completed.'
        );

        this.isUploading = false;
      }

    });

  }


  private extractGeminiText(
    response: string
  ): string {

    /*
     * Try to parse Gemini JSON.
     */
    try {

      const data =
        JSON.parse(response);


      const text =
        data?.candidates?.[0]
          ?.content?.parts?.[0]
          ?.text;


      if (typeof text === 'string' &&
          text.trim().length > 0) {

        return text;
      }


      /*
       * If JSON exists but the expected
       * Gemini structure is missing,
       * return the original response.
       */
      return response;

    } catch {

      /*
       * Backend may already return plain text.
       */
      return response;
    }

  }


  private formatFileSize(
    bytes: number
  ): string {

    if (bytes === 0) {

      return '0 Bytes';
    }

    const units = [
      'Bytes',
      'KB',
      'MB',
      'GB'
    ];

    const index =
      Math.floor(
        Math.log(bytes) /
        Math.log(1024)
      );

    return (
      parseFloat(
        (
          bytes /
          Math.pow(1024, index)
        ).toFixed(2)
      ) +
      ' ' +
      units[index]
    );
  }

}