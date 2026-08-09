import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-voice-studio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voice-studio.html',
  styleUrl: './voice-studio.scss',
})
export class VoiceStudio {

  script = '';

  audioGenerated = false;

  generateVoice() {

    if (!this.script.trim()) {
      alert('Please enter a script first.');
      return;
    }

    this.audioGenerated = true;

  }

}