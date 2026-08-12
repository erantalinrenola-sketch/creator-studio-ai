import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AiVideoProjectData {
  story: string;
  script: string;
  characterPrompts: any[];
  scenePrompts: any[];
  scenes: any[];
  generatedImages: any[];
  generatedAudio: any[];
  generatedVideos: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AiVideoService {

  private projectData: {
    [projectIndex: number]: AiVideoProjectData
  } = {};

  // Temporary compatibility properties.
  // These will be removed after all modules are migrated.
  story = '';

  script = '';

  characterPrompts: any[] = [];

  scenePrompts: any[] = [];

  scenes: any[] = [];

  generatedImages: any[] = [];

  generatedAudio: any[] = [];

  generatedVideos: any[] = [];

  constructor(private http: HttpClient) {}

  private createEmptyProjectData(): AiVideoProjectData {
    return {
      story: '',
      script: '',
      characterPrompts: [],
      scenePrompts: [],
      scenes: [],
      generatedImages: [],
      generatedAudio: [],
      generatedVideos: []
    };
  }

  getProjectData(projectIndex: number): AiVideoProjectData {

    if (!this.projectData[projectIndex]) {

      this.projectData[projectIndex] =
        this.createEmptyProjectData();

    }

    return this.projectData[projectIndex];
  }

  generateScript(story: string): Observable<string> {

    return this.http.post(
      'http://localhost:8080/api/story/generate',
      {
        story: story
      },
      {
        responseType: 'text'
      }
    );
  }

}