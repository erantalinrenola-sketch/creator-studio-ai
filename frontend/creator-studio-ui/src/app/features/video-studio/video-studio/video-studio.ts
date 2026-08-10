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

  finalVideoGenerated = false;

  totalScenes = 0;

  totalImages = 0;

  totalAudio = 0;

  totalVideos = 0;

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

    this.totalScenes =
      projectData.scenes.length;

    this.totalImages =
      projectData.generatedImages.length;

    this.totalAudio =
      projectData.generatedAudio.length;

    this.totalVideos =
      projectData.generatedVideos.length;

    if (projectData.generatedVideos.length > 0) {
      this.finalVideoGenerated = true;
    }

  }

  generateFinalVideo() {

    if (this.totalScenes === 0) {
      alert('Please generate scenes first.');
      return;
    }

    if (this.totalImages === 0) {
      alert('Please generate images first.');
      return;
    }

    if (this.totalAudio === 0) {
      alert('Please generate voice first.');
      return;
    }

    if (this.totalVideos === 0) {
      alert('Please generate lip sync video first.');
      return;
    }

    this.finalVideoGenerated = true;

  }

}