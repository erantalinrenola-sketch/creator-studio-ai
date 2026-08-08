import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateProjectDialog } from '../create-project-dialog/create-project-dialog';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {

  constructor(private dialog: MatDialog) {}

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

  openCreateProjectDialog() {

    const dialogRef = this.dialog.open(CreateProjectDialog, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('RESULT RECEIVED:', result);

      if (result) {

        this.projects = [
          ...this.projects,
          {
            name: result.name,
            description: result.description,
            status: result.status
          }
        ];

        console.log('Projects Array:', this.projects);
        console.log('Projects Length:', this.projects.length);

      }

    });

  }

}