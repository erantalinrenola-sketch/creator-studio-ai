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

  scenePrompts: string[] = [];

  generatedImages: any[] = [];

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

    this.scenePrompts =
      projectData.scenePrompts?.length
        ? projectData.scenePrompts
        : JSON.parse(
            localStorage.getItem(
              'creator_scene_prompts'
            ) || '[]'
          );

    this.generatedImages =
      projectData.generatedImages?.length
        ? projectData.generatedImages
        : JSON.parse(
            localStorage.getItem(
              'creator_generated_images'
            ) || '[]'
          );

    console.log(
      'Loaded Scene Prompts:',
      this.scenePrompts.length
    );

    console.log(
      'Loaded Images:',
      this.generatedImages.length
    );
  }

  generateImages() {

    if (this.scenePrompts.length === 0) {
      alert('Please generate prompts first.');
      return;
    }

    this.generatedImages = [];

    this.scenePrompts.forEach((prompt, index) => {

      this.generatedImages.push({
        prompt: prompt,
        image:
          `https://picsum.photos/600/400?random=${index + 1}`
      });

    });

    const projectData =
      this.aiVideoService.getProjectData(this.projectIndex);

    projectData.generatedImages =
      this.generatedImages;

    localStorage.setItem(
      'creator_generated_images',
      JSON.stringify(this.generatedImages)
    );

    console.log(
      'Generated Images:',
      this.generatedImages
    );
  }

}