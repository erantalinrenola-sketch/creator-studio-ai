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

  scenes: any[] = [];

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

    this.script =
      projectData.script ||
      this.aiVideoService.getSavedScript();

    this.scenes =
      projectData.scenes || [];

    console.log('Loaded Script Length:', this.script.length);
  }

  generateScenes() {

    if (!this.script.trim()) {
      alert('Please generate a script first.');
      return;
    }

    this.scenes = [];

    const sceneBlocks =
      this.script
        .split(/Scene\s+\d+/i)
        .slice(1);

    console.log('====================');
    console.log('SCENE BLOCKS');
    console.log(sceneBlocks);
    console.log('====================');

    sceneBlocks.forEach((block, index) => {

      const location =
        block.match(/LOCATION:(.*?)(CHARACTERS:|$)/is)?.[1]?.trim() || '';

      const characters =
        block.match(/CHARACTERS:(.*?)(ACTION:|$)/is)?.[1]?.trim() || '';

      const action =
        block.match(/ACTION:(.*?)(DIALOGUE:|$)/is)?.[1]?.trim() || '';

      const dialogue =
        block.match(/DIALOGUE:(.*?)(EMOTION:|$)/is)?.[1]?.trim() || '';

      const emotion =
        block.match(/EMOTION:(.*)/is)?.[1]?.trim() || '';

      this.scenes.push({
        sceneNumber: index + 1,
        location,
        characters,
        action,
        dialogue,
        emotion
      });

    });

    const projectData =
      this.aiVideoService.getProjectData(this.projectIndex);

    projectData.scenes = this.scenes;

    localStorage.setItem(
      'creator_scenes',
      JSON.stringify(this.scenes)
    );

    console.log('Saving Scenes:', this.scenes);
    console.log('Scenes Count:', this.scenes.length);
    console.log('Scenes Saved To LocalStorage');

    console.log('Scenes Generated:', this.scenes);
  }

}