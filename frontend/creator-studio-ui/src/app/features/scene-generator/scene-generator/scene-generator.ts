import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AiVideoService } from '../../../core/services/ai-video.service';

@Component({
  selector: 'app-scene-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scene-generator.html',
  styleUrl: './scene-generator.scss',
})
export class SceneGenerator implements OnInit {

  projectIndex = -1;

  script = '';

  scenes: string[] = [];

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

    this.scenes = projectData.scenes;

  }

  generateScenes() {

    if (!this.script.trim()) {
      alert('Please generate a script in AI Video Workspace first.');
      return;
    }

    this.scenes = [
      'Scene 1: Main character enters a mysterious world.',
      'Scene 2: Character discovers something unexpected.',
      'Scene 3: A challenge appears.',
      'Scene 4: Character overcomes the challenge.',
      'Scene 5: Character returns home with new understanding.'
    ];

    const projectData =
      this.aiVideoService.getProjectData(this.projectIndex);

    projectData.scenes = this.scenes;

  }

}