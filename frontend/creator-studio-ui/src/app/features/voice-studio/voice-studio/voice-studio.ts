import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AiVideoService } from '../../../core/services/ai-video.service';

@Component({
  selector: 'app-voice-studio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voice-studio.html',
  styleUrl: './voice-studio.scss',
})
export class VoiceStudio implements OnInit {

  script = '';

  audioGenerated = false;

  constructor(
    private aiVideoService: AiVideoService
  ) {}

  ngOnInit() {

    this.script = this.aiVideoService.script;

  }

  generateVoice() {

    if (!this.script.trim()) {
      alert('Please generate a script in Story Generator first.');
      return;
    }

    this.audioGenerated = true;

    this.aiVideoService.generatedAudio.push({
      script: this.script,
      audioGenerated: true
    });

  }

}