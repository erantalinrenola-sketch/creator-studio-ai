import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AiVideoService } from '../../../core/services/ai-video.service';

@Component({
  selector: 'app-prompt-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prompt-generator.html',
  styleUrl: './prompt-generator.scss',
})
export class PromptGenerator implements OnInit {

  projectIndex = -1;

  scenes: any[] = [];

  characterPrompts: string[] = [];

  scenePrompts: string[] = [];

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

    this.scenes =
      projectData.scenes?.length
        ? projectData.scenes
        : JSON.parse(
            localStorage.getItem(
              `creator_scenes_${this.projectIndex}`
            ) || '[]'
          );

    this.characterPrompts =
      projectData.characterPrompts?.length
        ? projectData.characterPrompts
        : JSON.parse(
            localStorage.getItem(
              `creator_character_prompts_${this.projectIndex}`
            ) || '[]'
          );

    this.scenePrompts =
      projectData.scenePrompts?.length
        ? projectData.scenePrompts
        : JSON.parse(
            localStorage.getItem(
              `creator_scene_prompts_${this.projectIndex}`
            ) || '[]'
          );

    console.log(
      'Scenes Loaded:',
      this.scenes.length
    );

    console.log(
      'Character Prompts:',
      this.characterPrompts.length
    );

    console.log(
      'Scene Prompts:',
      this.scenePrompts.length
    );

  }

  generatePrompts() {

    if (this.scenes.length === 0) {
      alert('Please generate scenes first.');
      return;
    }

    this.characterPrompts = [];
    this.scenePrompts = [];

    this.scenes.forEach((scene: any) => {

      const characterPrompt = `
${scene.characters},
realistic cinematic character,
highly detailed face,
professional movie quality,
4k ultra realistic
`;

      const scenePrompt = `
${scene.location},
${scene.action},
emotion: ${scene.emotion},
cinematic lighting,
ultra realistic,
movie scene,
4k detailed environment
`;

      this.characterPrompts.push(
        characterPrompt.trim()
      );

      this.scenePrompts.push(
        scenePrompt.trim()
      );

    });

    const projectData =
      this.aiVideoService.getProjectData(
        this.projectIndex
      );

    projectData.characterPrompts =
      this.characterPrompts;

    projectData.scenePrompts =
      this.scenePrompts;

    localStorage.setItem(
      `creator_character_prompts_${this.projectIndex}`,
      JSON.stringify(this.characterPrompts)
    );

    localStorage.setItem(
      `creator_scene_prompts_${this.projectIndex}`,
      JSON.stringify(this.scenePrompts)
    );

    console.log(
      'Character Prompts Generated'
    );

    console.log(
      'Scene Prompts Generated'
    );

  }

}