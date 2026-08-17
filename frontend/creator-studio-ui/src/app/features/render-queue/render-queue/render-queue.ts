import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-render-queue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './render-queue.html',
  styleUrl: './render-queue.scss',
})
export class RenderQueue implements OnInit {

  project: any = null;
  
  projectIndex = -1;

  totalImages = 0;

  totalAudio = 0;

  totalVideos = 0;

  finalVideoGenerated = false;

  ngOnInit() {

    this.projectIndex = Number(
      this.route.snapshot.paramMap.get('index')
    );

    const projects =
      this.projectService.getProjects();

    this.project =
      projects[this.projectIndex];

    const images =
      JSON.parse(
        localStorage.getItem(
          `creator_generated_images_${this.projectIndex}`
        ) || '[]'
      );

    const audio =
      JSON.parse(
        localStorage.getItem(
          `creator_generated_audio_${this.projectIndex}`
        ) || '[]'
      );

    const videos =
      JSON.parse(
        localStorage.getItem(
          `creator_lipsync_video_${this.projectIndex}`
        ) || '[]'
      );

    this.totalImages = images.length;
    this.totalAudio = audio.length;
    this.totalVideos = videos.length;

    const finalVideo =
      localStorage.getItem(
        `creator_final_video_${this.projectIndex}`
      );

    if (finalVideo) {
      this.finalVideoGenerated = true;
    }

  }

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

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
      `creator_final_video_${this.projectIndex}`,
      'generated'
    );

    console.log(
      'Final Video Rendered'
    );

  }

}