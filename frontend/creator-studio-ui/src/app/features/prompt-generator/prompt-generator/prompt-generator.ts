import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AiVideoService } from '../../../core/services/ai-video.service';

@Component({
  selector: 'app-prompt-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prompt-generator.html',
  styleUrl: './prompt-generator.scss',
})
export class PromptGenerator implements OnInit {

  script = '';

  characterPrompt = '';

  scenePrompt = '';

  constructor(
    private aiVideoService: AiVideoService
  ) {}

  ngOnInit() {

    this.script = this.aiVideoService.script;

  }

  generatePrompts() {

    if (!this.script.trim()) {
      alert('Please generate a script in Story Generator first.');
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

    this.aiVideoService.characterPrompts = [
      this.characterPrompt
    ];

    this.aiVideoService.scenePrompts = [
      this.scenePrompt
    ];

  }

}