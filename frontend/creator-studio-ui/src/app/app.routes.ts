import { Routes } from '@angular/router';

import { MainLayout } from './layouts/main/main-layout/main-layout';

import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { Projects } from './features/projects/projects/projects';
import { StoryGenerator } from './features/story-generator/story-generator/story-generator';
import { SceneGenerator } from './features/scene-generator/scene-generator/scene-generator';
import { PromptGenerator } from './features/prompt-generator/prompt-generator/prompt-generator';
import { ImageStudio } from './features/image-studio/image-studio/image-studio';
import { VideoStudio } from './features/video-studio/video-studio/video-studio';
import { VoiceStudio } from './features/voice-studio/voice-studio/voice-studio';
import { LipSync } from './features/lip-sync/lip-sync/lip-sync';
import { RenderQueue } from './features/render-queue/render-queue/render-queue';
import { Settings } from './features/settings/settings/settings';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard', component: Dashboard },
      { path: 'projects', component: Projects },
      { path: 'story-generator', component: StoryGenerator },
      { path: 'scene-generator', component: SceneGenerator },
      { path: 'prompt-generator', component: PromptGenerator },
      { path: 'image-studio', component: ImageStudio },
      { path: 'video-studio', component: VideoStudio },
      { path: 'voice-studio', component: VoiceStudio },
      { path: 'lip-sync', component: LipSync },
      { path: 'render-queue', component: RenderQueue },
      { path: 'settings', component: Settings }
    ]
  }
];