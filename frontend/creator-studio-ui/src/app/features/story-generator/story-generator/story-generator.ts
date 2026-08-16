import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AiVideoService } from '../../../core/services/ai-video.service';

@Component({
  selector: 'app-story-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './story-generator.html',
  styleUrl: './story-generator.scss',
})
export class StoryGenerator implements OnInit {

  projectIndex = -1;

  story = '';

  script = '';

  isGenerating = false;

  constructor(
    private route: ActivatedRoute,
    private aiVideoService: AiVideoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.projectIndex = Number(
      this.route.snapshot.paramMap.get('index')
    );

    this.story =
      this.aiVideoService.getSavedStory(
        this.projectIndex
      );

    this.script =
      this.aiVideoService.getSavedScript(
        this.projectIndex
      );

    console.log('Loaded Story:', this.story);
    console.log(
      'Loaded Script Length:',
      this.script.length
    );
  }

  generateScript() {

    if (!this.story.trim()) {
      alert('Please enter a story first.');
      return;
    }

    this.isGenerating = true;
    this.script = '';

    this.aiVideoService
      .generateScript(this.story)
      .subscribe({

        next: (response: string) => {

          this.script = String(response);

          this.aiVideoService.story =
            this.story;

          this.aiVideoService.script =
            this.script;

          this.aiVideoService.saveStoryAndScript(
            this.projectIndex,
            this.story,
            this.script
          );

          this.isGenerating = false;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Script generation failed:',
            error
          );

          this.isGenerating = false;

        }

      });

  }

  clearStory() {

    this.story = '';
    this.script = '';

    localStorage.removeItem(
      `creator_story_${this.projectIndex}`
    );

    localStorage.removeItem(
      `creator_script_${this.projectIndex}`
    );

    this.aiVideoService.story = '';
    this.aiVideoService.script = '';

  }

  copyScript() {

    if (!this.script) {
      return;
    }

    navigator.clipboard.writeText(
      this.script
    );

    alert(
      'Script copied successfully!'
    );

  }

}