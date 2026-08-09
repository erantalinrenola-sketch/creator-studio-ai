import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prompt-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prompt-generator.html',
  styleUrl: './prompt-generator.scss',
})
export class PromptGenerator {

  script = '';

  characterPrompt = '';

  scenePrompt = '';

  generatePrompts() {

    if (!this.script.trim()) {
      alert('Please enter a script first.');
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

  }

}