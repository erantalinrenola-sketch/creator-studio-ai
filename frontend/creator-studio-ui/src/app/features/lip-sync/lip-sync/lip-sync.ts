import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AiVideoService } from '../../../core/services/ai-video.service';

@Component({
  selector: 'app-lip-sync',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lip-sync.html',
  styleUrl: './lip-sync.scss',
})
export class LipSync implements OnInit {

  projectIndex = -1;

  characterImage = '';

  audioFile = '';

  videoGenerated = false;

  constructor(
    private route: ActivatedRoute,
    private aiVideoService: AiVideoService
  ) {}

  ngOnInit() {

    this.projectIndex = Number(
      this.route.snapshot.paramMap.get('index')
    );

    const projectData =
      this.aiVideoService.getProjectData(
        this.projectIndex
      );

    const images =
      projectData.generatedImages?.length
        ? projectData.generatedImages
        : JSON.parse(
            localStorage.getItem(
              `creator_generated_images_${this.projectIndex}`
            ) || '[]'
          );

    const audio =
      projectData.generatedAudio?.length
        ? projectData.generatedAudio
        : JSON.parse(
            localStorage.getItem(
              `creator_generated_audio_${this.projectIndex}`
            ) || '[]'
          );

    if (images.length > 0) {

      this.characterImage =
        images[images.length - 1].image;

    }

    if (audio.length > 0) {

      this.audioFile =
        'Generated Audio';

    }

    const savedLipSync =
      JSON.parse(
        localStorage.getItem(
          `creator_lipsync_video_${this.projectIndex}`
        ) || '[]'
      );

    if (
      projectData.generatedVideos.length > 0 ||
      savedLipSync.length > 0
    ) {

      this.videoGenerated = true;

    }

  }

  generateLipSync() {

    if (!this.characterImage.trim()) {
      alert('Please generate an image first.');
      return;
    }

    if (!this.audioFile.trim()) {
      alert('Please generate voice first.');
      return;
    }

    this.videoGenerated = true;

    const projectData =
      this.aiVideoService.getProjectData(
        this.projectIndex
      );

    projectData.generatedVideos = [
      {
        image: this.characterImage,
        audio: this.audioFile,
        video:
          'https://www.w3schools.com/html/mov_bbb.mp4'
      }
    ];

    localStorage.setItem(
      `creator_lipsync_video_${this.projectIndex}`,
      JSON.stringify(
        projectData.generatedVideos
      )
    );

    console.log(
      'Lip Sync Generated'
    );

  }

}