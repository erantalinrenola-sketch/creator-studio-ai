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

  script = '';

  characterPrompt = '';

  scenePrompt = '';

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

    this.script = projectData.script;

    this.characterPrompt =
      projectData.characterPrompts[0] || '';

    this.scenePrompt =
      projectData.scenePrompts[0] || '';

  }

  generatePrompts() {

    if (!this.script.trim()) {
      alert('Please generate a script in AI Video Workspace first.');
      return;
    }

    this.characterPrompt = `
12-year-old boy, black hair, expressive eyes,
blue shirt, brown shorts, cinematic character design,
highly detailed face, fantasy adventure style.
`;

    this.scenePrompt = `
Magical forest with glowing trees,
golden sunlight, fantasy atmosphere,
cinematic lighting, ultra detailed,
3D animation style.
`;

    const projectData =
      this.aiVideoService.getProjectData(this.projectIndex);

    projectData.characterPrompts = [
      this.characterPrompt
    ];

    projectData.scenePrompts = [
      this.scenePrompt
    ];

  }

}