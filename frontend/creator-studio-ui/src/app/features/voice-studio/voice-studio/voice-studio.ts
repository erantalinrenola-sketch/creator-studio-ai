import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AiVideoService } from '../../../core/services/ai-video.service';

@Component({
  selector: 'app-voice-studio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voice-studio.html',
  styleUrl: './voice-studio.scss',
})
export class VoiceStudio implements OnInit {

  projectIndex = -1;

  script = '';

  audioGenerated = false;

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

    this.script =
      projectData.script ||
      this.aiVideoService.getSavedScript(
        this.projectIndex
      );

    const savedAudio = JSON.parse(
      localStorage.getItem(
        'creator_generated_audio'
      ) || '[]'
    );

    if (
      projectData.generatedAudio.length > 0 ||
      savedAudio.length > 0
    ) {
      this.audioGenerated = true;
    }

  }

  generateVoice() {

    if (!this.script.trim()) {
      alert(
        'Please generate a script in AI Video Workspace first.'
      );
      return;
    }

    this.audioGenerated = true;

    const projectData =
      this.aiVideoService.getProjectData(
        this.projectIndex
      );

    projectData.generatedAudio = [
      {
        script: this.script,
        audioGenerated: true
      }
    ];

    localStorage.setItem(
      'creator_generated_audio',
      JSON.stringify(
        projectData.generatedAudio
      )
    );

    console.log(
      'Audio Generated'
    );

  }

}