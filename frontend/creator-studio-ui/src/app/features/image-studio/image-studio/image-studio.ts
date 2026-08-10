import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AiVideoService } from '../../../core/services/ai-video.service';

@Component({
  selector: 'app-image-studio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-studio.html',
  styleUrl: './image-studio.scss',
})
export class ImageStudio implements OnInit {

  projectIndex = -1;

  prompt = '';

  generatedImage = '';

  scenes: any[] = [];

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

    this.scenes = projectData.scenes;

    if (projectData.generatedImages.length > 0) {

      const latestImage =
        projectData.generatedImages[
          projectData.generatedImages.length - 1
        ];

      this.prompt = latestImage.prompt;
      this.generatedImage = latestImage.image;

    }

  }

  generateImage() {

    if (!this.prompt.trim()) {
      alert('Please enter an image prompt.');
      return;
    }

    this.generatedImage =
      'https://via.placeholder.com/600x400?text=AI+Generated+Image';

    const projectData =
      this.aiVideoService.getProjectData(this.projectIndex);

    projectData.generatedImages.push({
      prompt: this.prompt,
      image: this.generatedImage
    });

  }

}