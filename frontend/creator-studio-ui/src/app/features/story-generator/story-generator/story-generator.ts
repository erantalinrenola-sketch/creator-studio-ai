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

  constructor(
    private aiVideoService: AiVideoService
  ) {}

  generateScript() {

    if (!this.story.trim()) {
      alert('Please enter a story first.');
      return;
    }

    this.script = `
Scene 1:

The story begins with our main character entering a mysterious world.

Scene 2:

The character discovers something unexpected and starts exploring the surroundings.

Scene 3:

A challenge appears, and the character must find a way to overcome it.

Scene 4:

After overcoming the challenge, the character discovers the true meaning of the journey.

Scene 5:

The story ends with the character returning home with a new understanding.
`;

    this.aiVideoService.story = this.story;
    this.aiVideoService.script = this.script;

  }

}