import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lip-sync',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lip-sync.html',
  styleUrl: './lip-sync.scss',
})
export class LipSync {

  characterImage = '';

  audioFile = '';

  videoGenerated = false;

  generateLipSync() {

    if (!this.characterImage.trim()) {
      alert('Please enter character image URL.');
      return;
    }

    this.videoGenerated = true;

  }

}