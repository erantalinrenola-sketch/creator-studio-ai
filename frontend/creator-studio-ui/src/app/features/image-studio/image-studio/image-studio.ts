import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-studio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-studio.html',
  styleUrl: './image-studio.scss',
})
export class ImageStudio {

  prompt = '';

  generatedImage = '';

  generateImage() {

    if (!this.prompt.trim()) {
      alert('Please enter an image prompt.');
      return;
    }

    this.generatedImage =
      'https://via.placeholder.com/600x400?text=AI+Generated+Image';

  }

}