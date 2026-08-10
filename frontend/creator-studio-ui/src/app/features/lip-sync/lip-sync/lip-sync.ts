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
      this.aiVideoService.getProjectData(this.projectIndex);

    const images = projectData.generatedImages;

    const audio = projectData.generatedAudio;

    if (images.length > 0) {

      this.characterImage =
        images[images.length - 1].image;

    }

    if (audio.length > 0) {

      this.audioFile = 'Generated Audio';

    }

    if (projectData.generatedVideos.length > 0) {

      this.videoGenerated = true;

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

    const projectData =
      this.aiVideoService.getProjectData(this.projectIndex);

    projectData.generatedVideos.push({
      image: this.characterImage,
      audio: this.audioFile,
      videoGenerated: true
    });

  }

}