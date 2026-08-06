import { Component, signal } from '@angular/core';
import { MainLayout } from './layouts/main/main-layout/main-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('creator-studio-ui');
}