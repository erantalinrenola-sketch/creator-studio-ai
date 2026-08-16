import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AiVideoService } from '../../../core/services/ai-video.service';

@Component({
  selector: 'app-video-studio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-studio.html',
  styleUrl: './video-studio.scss',
})
export class VideoStudio implements OnInit {

  projectIndex = -1;

  generatedImages: any[] = [];

  generatedVideos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private aiVideoService: AiVideoService
  ) {}

  ngOnInit() {

    this.projectIndex = Number(
      this.route.snapshot.paramMap.get('index')
    );

    const projectData =
      this.aiVideoService.getProjectData(this.projectIndex);

    this.generatedImages =
      projectData.generatedImages?.length
        ? projectData.generatedImages
        : JSON.parse(
            localStorage.getItem(
              'creator_generated_images'
            ) || '[]'
          );

    this.generatedVideos =
      projectData.generatedVideos?.length
        ? projectData.generatedVideos
        : JSON.parse(
            localStorage.getItem(
              'creator_generated_videos'
            ) || '[]'
          );

    console.log(
      'Loaded Images:',
      this.generatedImages.length
    );

    console.log(
      'Loaded Videos:',
      this.generatedVideos.length
    );
  }

  generateVideos() {

    if (this.generatedImages.length === 0) {
      alert('Please generate images first.');
      return;
    }

    this.generatedVideos = [];

    this.generatedImages.forEach((image, index) => {

      this.generatedVideos.push({
        image: image.image,
        prompt: image.prompt,
        video:
          'https://www.w3schools.com/html/mov_bbb.mp4'
      });

    });

    const projectData =
      this.aiVideoService.getProjectData(this.projectIndex);

    projectData.generatedVideos =
      this.generatedVideos;

    localStorage.setItem(
      'creator_generated_videos',
      JSON.stringify(this.generatedVideos)
    );

    console.log(
      'Generated Videos:',
      this.generatedVideos
    );
  }

}