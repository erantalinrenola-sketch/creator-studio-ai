import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { AiVideoService } from '../../../core/services/ai-video.service';

@Component({
  selector: 'app-video-studio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-studio.html',
  styleUrl: './video-studio.scss',
})
export class VideoStudio implements OnInit {

  finalVideoGenerated = false;

  totalScenes = 0;

  totalImages = 0;

  totalAudio = 0;

  totalVideos = 0;

  constructor(
    private aiVideoService: AiVideoService
  ) {}

  ngOnInit() {

    this.totalScenes = this.aiVideoService.scenes.length;

    this.totalImages = this.aiVideoService.generatedImages.length;

    this.totalAudio = this.aiVideoService.generatedAudio.length;

    this.totalVideos = this.aiVideoService.generatedVideos.length;

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