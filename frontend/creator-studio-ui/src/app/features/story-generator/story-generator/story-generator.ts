import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AiVideoService } from '../../../core/services/ai-video.service';

@Component({
  selector: 'app-story-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './story-generator.html',
  styleUrl: './story-generator.scss',
})
export class StoryGenerator implements OnInit {

  story = '';
  script = '';
  isGenerating = false;

  constructor(
    private aiVideoService: AiVideoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.story = this.aiVideoService.getSavedStory();
    this.script = this.aiVideoService.getSavedScript();

    console.log('Loaded Story:', this.story);
    console.log('Loaded Script Length:', this.script.length);
  }
  generateScript() {

    if (!this.story.trim()) {
      alert('Please enter a story first.');
      return;
    }

    this.isGenerating = true;
    this.script = '';

    this.aiVideoService.generateScript(this.story).subscribe({

      next: (response: string) => {

        console.log('SCRIPT RECEIVED');
        console.log('Response Length:', response?.length);
        console.log('Response Data:', response);

        this.script = String(response);

        console.log('SCRIPT VALUE:');
        console.log(this.script);

        this.aiVideoService.story = this.story;
        this.aiVideoService.script = this.script;

        this.aiVideoService.saveStoryAndScript(
          this.story,
          this.script
        );

        this.isGenerating = false;
        
        this.cdr.detectChanges();

        console.log('isGenerating =', this.isGenerating);
        console.log('script length =', this.script.length);

        console.log('LOADING FALSE');
      },

      error: (error) => {

        console.error('Script generation failed:', error);

        this.isGenerating = false;

        console.log('ERROR BLOCK EXECUTED');
      }
    });
  }
  clearStory() {

    this.story = '';
    this.script = '';
  
    localStorage.removeItem('creator_story');
    localStorage.removeItem('creator_script');
  
    this.aiVideoService.story = '';
    this.aiVideoService.script = '';
  
  }
  copyScript() {

    if (!this.script) {
      return;
    }
  
    navigator.clipboard.writeText(this.script);
  
    alert('Script copied successfully!');
  
  }
}