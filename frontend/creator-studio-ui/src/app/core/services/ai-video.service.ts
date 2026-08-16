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

  saveStoryAndScript(
    projectIndex: number,
    story: string,
    script: string
  ): void {
  
    localStorage.setItem(
      `creator_story_${projectIndex}`,
      story
    );
  
    localStorage.setItem(
      `creator_script_${projectIndex}`,
      script
    );
  
  }

  getSavedStory(
    projectIndex: number
  ): string {
  
    return (
      localStorage.getItem(
        `creator_story_${projectIndex}`
      ) || ''
    );
  
  }

  getSavedScript(
    projectIndex: number
  ): string {
  
    return (
      localStorage.getItem(
        `creator_script_${projectIndex}`
      ) || ''
    );
  
  }

}