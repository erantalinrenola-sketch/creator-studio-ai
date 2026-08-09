import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AiVideoService } from '../../../core/services/ai-video.service';

@Component({
  selector: 'app-image-studio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-studio.html',
  styleUrl: './image-studio.scss',
})
export class ImageStudio implements OnInit {

  prompt = '';

  generatedImage = '';

  scenes: any[] = [];

  constructor(
    private aiVideoService: AiVideoService
  ) {}

  ngOnInit() {

    this.scenes = this.aiVideoService.scenes;

  }

  generateImage() {

    if (!this.prompt.trim()) {
      alert('Please enter an image prompt.');
      return;
    }

    this.generatedImage =
      'https://via.placeholder.com/600x400?text=AI+Generated+Image';

    this.aiVideoService.generatedImages.push({
      prompt: this.prompt,
      image: this.generatedImage
    });

  }

}