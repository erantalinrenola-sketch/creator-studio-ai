import { Routes } from '@angular/router';

import { MainLayout } from './layouts/main/main-layout/main-layout';

import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { Projects } from './features/projects/projects/projects';
import { ProjectTasks } from './features/projects/project-tasks/project-tasks';
import { ProjectDetails } from './features/projects/project-details/project-details';
import { AiVideoWorkspace } from './features/ai-video/ai-video-workspace/ai-video-workspace';
import { StoryGenerator } from './features/story-generator/story-generator/story-generator';
import { SceneGenerator } from './features/scene-generator/scene-generator/scene-generator';
import { PromptGenerator } from './features/prompt-generator/prompt-generator/prompt-generator';
import { ImageStudio } from './features/image-studio/image-studio/image-studio';
import { Users } from './features/users/users';
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
      { path: 'users', component: Users },
      { path: 'ai-video/:index', component: AiVideoWorkspace },
      { path: 'project-tasks', component: ProjectTasks },
      { path: 'project-details/:index', component: ProjectDetails },
      { path: 'story-generator/:index', component: StoryGenerator },
      { path: 'scene-generator/:index', component: SceneGenerator },
      { path: 'prompt-generator/:index', component: PromptGenerator },
      { path: 'image-studio/:index', component: ImageStudio },
      { path: 'video-studio/:index', component: VideoStudio },
      { path: 'voice-studio/:index', component: VoiceStudio },
      { path: 'lip-sync/:index', component: LipSync },
      { path: 'render-queue/:index', component: RenderQueue },
      { path: 'settings', component: Settings }
    ]
  }
];