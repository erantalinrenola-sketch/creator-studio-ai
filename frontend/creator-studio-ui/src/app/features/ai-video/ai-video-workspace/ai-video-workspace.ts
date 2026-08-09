import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ProjectService } from '../../../core/services/project.service';
import { AiVideoService } from '../../../core/services/ai-video.service';

@Component({
  selector: 'app-ai-video-workspace',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-video-workspace.html',
  styleUrl: './ai-video-workspace.scss'
})
export class AiVideoWorkspace implements OnInit {

  projectIndex = -1;

  project: any = null;

  story = '';

  script = '';

  characters: any[] = [];

  characterPrompts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private aiVideoService: AiVideoService
  ) {}

  ngOnInit() {

    this.projectIndex = Number(
      this.route.snapshot.paramMap.get('index')
    );

    const projects = this.projectService.getProjects();

    if (projects[this.projectIndex]) {

      this.project = projects[this.projectIndex];

    }

  }

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

  generateCharacters() {

    if (!this.script) {
      alert('Please generate the script first.');
      return;
    }

    this.characters = [
      {
        name: 'Main Character',
        role: 'Main Character'
      },
      {
        name: 'Supporting Character',
        role: 'Supporting Character'
      }
    ];

  }

  generateCharacterPrompts() {

    if (this.characters.length === 0) {
      alert('Please generate the characters first.');
      return;
    }

    this.characterPrompts = [
      {
        name: 'Main Character',
        prompt:
          'A young protagonist with expressive eyes, natural appearance, friendly personality, cinematic character design, detailed face, consistent clothing and appearance, high quality.'
      },
      {
        name: 'Supporting Character',
        prompt:
          'A distinctive supporting character with expressive facial features, unique clothing, warm personality, cinematic character design, detailed face, high quality.'
      }
    ];

  }

}