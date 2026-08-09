import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-video-studio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-studio.html',
  styleUrl: './video-studio.scss',
})
export class VideoStudio {

  finalVideoGenerated = false;

  generateFinalVideo() {

    this.finalVideoGenerated = true;

  }

}