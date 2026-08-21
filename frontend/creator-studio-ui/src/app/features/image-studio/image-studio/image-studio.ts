import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  isGenerating = false;

  constructor(
    private route: ActivatedRoute,
    private aiVideoService: AiVideoService,
    private http: HttpClient
  ) {}

  ngOnInit() {

    this.projectIndex = Number(
      this.route.snapshot.paramMap.get('index')
    );

    const projectData =
      this.aiVideoService.getProjectData(
        this.projectIndex
      );

    this.scenePrompts =
      projectData.scenePrompts?.length
        ? projectData.scenePrompts
        : JSON.parse(
            localStorage.getItem(
              `creator_scene_prompts_${this.projectIndex}`
            ) || '[]'
          );

    this.generatedImages =
      projectData.generatedImages?.length
        ? projectData.generatedImages
        : JSON.parse(
            localStorage.getItem(
              `creator_generated_images_${this.projectIndex}`
            ) || '[]'
          );

    console.log(
      'Loaded Scene Prompts:',
      this.scenePrompts
    );

    console.log(
      'Loaded Images:',
      this.generatedImages
    );
  }

  generateImages() {

    console.log('Generate Images Clicked');

    if (this.scenePrompts.length === 0) {

      alert('No scene prompts found.');

      return;
    }

    this.generatedImages = [];

    this.isGenerating = true;

    this.scenePrompts.forEach((prompt, index) => {

      console.log(
        'Sending Prompt:',
        prompt
      );

      this.http.post(
        'http://localhost:8080/api/image-studio/generate',
        prompt,
        {
          responseType: 'text'
        }
      ).subscribe({

        next: (response) => {

          console.log(
            'Backend Response:',
            response
          );

          this.generatedImages.push({

            prompt: prompt,

            image:
              `https://picsum.photos/600/400?random=${index + 1}`

          });

          console.log(
            'Generated Images:',
            this.generatedImages
          );
          
          const projectData =
            this.aiVideoService.getProjectData(
              this.projectIndex
            );

          projectData.generatedImages =
            this.generatedImages;

          localStorage.setItem(
            `creator_generated_images_${this.projectIndex}`,
            JSON.stringify(this.generatedImages)
          );

        },

        error: (error) => {

          console.error(
            'Image Generation Failed',
            error
          );

        },

        complete: () => {

          this.isGenerating = false;

        }

      });

    });

  }

}