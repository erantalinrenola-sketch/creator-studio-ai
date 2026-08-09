import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AiVideoService } from '../../../core/services/ai-video.service';

@Component({
  selector: 'app-scene-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scene-generator.html',
  styleUrl: './scene-generator.scss',
})
export class SceneGenerator implements OnInit {

  script = '';

  scenes: string[] = [];

  constructor(
    private aiVideoService: AiVideoService
  ) {}

  ngOnInit() {

    this.script = this.aiVideoService.script;

  }

  generateScenes() {

    if (!this.script.trim()) {
      alert('Please generate a script in Story Generator first.');
      return;
    }

    this.scenes = [
      'Scene 1: Main character enters a mysterious world.',
      'Scene 2: Character discovers something unexpected.',
      'Scene 3: A challenge appears.',
      'Scene 4: Character overcomes the challenge.',
      'Scene 5: Character returns home with new understanding.'
    ];

    this.aiVideoService.scenes = this.scenes;

  }

}