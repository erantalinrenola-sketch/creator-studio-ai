import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateProjectDialog } from '../create-project-dialog/create-project-dialog';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {

  projects: any[] = [];

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService
  ) {}

  ngOnInit() {

    const savedProjects = this.projectService.getProjects();

    if (savedProjects.length > 0) {

      this.projects = savedProjects;

    } else {

      this.projects = [
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

      this.projectService.saveProjects(this.projects);
    }

  }

  openCreateProjectDialog() {

    const dialogRef = this.dialog.open(CreateProjectDialog, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.projects = [
          ...this.projects,
          {
            name: result.name,
            description: result.description,
            status: result.status
          }
        ];

        this.projectService.saveProjects(this.projects);

      }

    });

  }

  editProject(index: number) {

    const dialogRef = this.dialog.open(CreateProjectDialog, {
      width: '600px',
      data: this.projects[index]
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.projects = this.projects.map((project, i) =>
          i === index ? result : project
        );
      
        this.projectService.saveProjects(this.projects);
      
      }

    });

  }

  deleteProject(index: number) {

    const confirmed = confirm(
      'Are you sure you want to delete this project?'
    );

    if (confirmed) {

      this.projects.splice(index, 1);

      this.projectService.saveProjects(this.projects);

    }

  }

}