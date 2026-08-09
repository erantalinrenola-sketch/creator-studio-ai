import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AiVideoService } from '../../../core/services/ai-video.service';

@Component({
  selector: 'app-lip-sync',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lip-sync.html',
  styleUrl: './lip-sync.scss',
})
export class LipSync implements OnInit {

  characterImage = '';

  audioFile = '';

  videoGenerated = false;

  constructor(
    private aiVideoService: AiVideoService
  ) {}

  ngOnInit() {

    const images = this.aiVideoService.generatedImages;
    const audio = this.aiVideoService.generatedAudio;

    if (images.length > 0) {
      this.characterImage = images[images.length - 1].image;
    }

    if (audio.length > 0) {
      this.audioFile = 'Generated Audio';
    }

  }

  generateLipSync() {

    if (!this.characterImage.trim()) {
      alert('Please generate an image in Image Studio first.');
      return;
    }

    if (!this.audioFile.trim()) {
      alert('Please generate voice in Voice Studio first.');
      return;
    }

    this.videoGenerated = true;

    this.aiVideoService.generatedVideos.push({
      image: this.characterImage,
      audio: this.audioFile,
      videoGenerated: true
    });

  }

}