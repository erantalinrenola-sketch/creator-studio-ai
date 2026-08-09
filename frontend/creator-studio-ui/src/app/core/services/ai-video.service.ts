import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiVideoService {

  story = '';

  script = '';

  characterPrompts: any[] = [];

  scenePrompts: any[] = [];

  scenes: any[] = [];

  generatedImages: any[] = [];

  generatedAudio: any[] = [];

  generatedVideos: any[] = [];

}