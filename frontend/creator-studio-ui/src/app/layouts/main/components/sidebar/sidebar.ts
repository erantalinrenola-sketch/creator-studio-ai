import { Component } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {

  projectIndex = -1;

  constructor(
    private router: Router
  ) {

    this.updateProjectIndex(this.router.url);

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        this.updateProjectIndex(event.urlAfterRedirects);
      }

    });

  }

  private updateProjectIndex(url: string) {

    const match = url.match(/\/(?:ai-video|project-details|story-generator|scene-generator|prompt-generator|image-studio|video-studio|voice-studio|lip-sync)\/(\d+)/);

    if (match) {
      this.projectIndex = Number(match[1]);
    }

  }

}