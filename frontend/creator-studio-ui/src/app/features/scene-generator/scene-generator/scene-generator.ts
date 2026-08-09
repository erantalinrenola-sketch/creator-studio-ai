import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scene-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scene-generator.html',
  styleUrl: './scene-generator.scss',
})
export class SceneGenerator {

  script = '';

  scenes: string[] = [];

  generateScenes() {

    if (!this.script.trim()) {
      alert('Please enter a script first.');
      return;
    }

    this.scenes = [
      'Scene 1: Main character enters a mysterious world.',
      'Scene 2: Character discovers something unexpected.',
      'Scene 3: A challenge appears.',
      'Scene 4: Character overcomes the challenge.',
      'Scene 5: Character returns home with new understanding.'
    ];

  }

}