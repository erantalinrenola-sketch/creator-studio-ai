import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-render-queue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './render-queue.html',
  styleUrl: './render-queue.scss',
})
export class RenderQueue implements OnInit {

  totalImages = 0;

  totalAudio = 0;

  totalVideos = 0;

  finalVideoGenerated = false;

  ngOnInit() {

    const images =
      JSON.parse(
        localStorage.getItem(
          'creator_generated_images'
        ) || '[]'
      );

    const audio =
      JSON.parse(
        localStorage.getItem(
          'creator_generated_audio'
        ) || '[]'
      );

    const videos =
      JSON.parse(
        localStorage.getItem(
          'creator_lipsync_video'
        ) || '[]'
      );

    this.totalImages = images.length;
    this.totalAudio = audio.length;
    this.totalVideos = videos.length;

    const finalVideo =
      localStorage.getItem(
        'creator_final_video'
      );

    if (finalVideo) {
      this.finalVideoGenerated = true;
    }

  }

  renderFinalVideo() {

    if (this.totalImages === 0) {
      alert('Please generate images first.');
      return;
    }

    if (this.totalAudio === 0) {
      alert('Please generate voice first.');
      return;
    }

    if (this.totalVideos === 0) {
      alert('Please generate lip sync first.');
      return;
    }

    this.finalVideoGenerated = true;

    localStorage.setItem(
      'creator_final_video',
      'generated'
    );

    console.log(
      'Final Video Rendered'
    );

  }

}