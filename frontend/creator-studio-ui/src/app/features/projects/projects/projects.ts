import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {

  projects = [
    {
      name: 'Creator Studio AI',
      description: 'AI Content Creation Platform',
      status: 'Completed'
    },
    {
      name: 'CRM Web App',
      description: 'Angular + Spring Boot Project',
      status: 'In Progress'
    },
    {
      name: 'YouTube Automation',
      description: 'Video Generation Workflow',
      status: 'Draft'
    }
  ];

}