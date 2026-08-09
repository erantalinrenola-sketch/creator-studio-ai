import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProjectService } from '../../../core/services/project.service';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  totalProjects = 0;
  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  ngOnInit() {

    const projects = this.projectService.getProjects();
    const tasks = this.taskService.getTasks();

    this.totalProjects = projects.length;
    this.totalTasks = tasks.length;

    this.completedTasks = tasks.filter(
      (task: any) => task.completed
    ).length;

    this.pendingTasks = tasks.filter(
      (task: any) => !task.completed
    ).length;

  }

}