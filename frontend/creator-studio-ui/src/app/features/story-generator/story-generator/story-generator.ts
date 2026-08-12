import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AiVideoService } from '../../../core/services/ai-video.service';

@Component({
  selector: 'app-story-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './story-generator.html',
  styleUrl: './story-generator.scss',
})
export class StoryGenerator {

  story = '';
  script = '';
  isGenerating = false;

  constructor(
    private aiVideoService: AiVideoService
  ) {}

  generateScript() {

    if (!this.story.trim()) {
      alert('Please enter a story first.');
      return;
    }

    this.isGenerating = true;
    this.script = '';

    this.aiVideoService.generateScript(this.story).subscribe({
      next: (response: string) => {

        this.script = response;

        this.aiVideoService.story = this.story;
        this.aiVideoService.script = this.script;

        this.isGenerating = false;
      },

      error: (error) => {

        console.error('Script generation failed:', error);

        alert('Failed to generate script. Please make sure the backend is running.');

        this.isGenerating = false;
      }
    });
  }
}