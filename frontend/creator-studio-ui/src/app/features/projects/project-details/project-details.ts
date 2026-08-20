import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService } from '../../../core/services/project.service';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss'
})
export class ProjectDetails implements OnInit {

  project: any = null;

  projectIndex = -1;

  projectTasks: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  ngOnInit() {

    this.projectIndex = Number(
      this.route.snapshot.paramMap.get('index')
    );

    const projects = this.projectService.getProjects();

    if (projects[this.projectIndex]) {

      this.project = projects[this.projectIndex];

      this.loadProjectTasks();

    }

  }

  loadProjectTasks() {

    const allTasks = this.taskService.getTasks();

    this.projectTasks = allTasks.filter(
      (task: any) => task.projectIndex === this.projectIndex
    );

  }

  addProjectTask() {

    const taskName = prompt('Enter Task Name');

    if (!taskName) {
      return;
    }

    const allTasks = this.taskService.getTasks();

    const newTask = {
      name: taskName,
      completed: false,
      projectIndex: this.projectIndex
    };

    allTasks.push(newTask);

    this.taskService.saveTasks(allTasks);

    this.loadProjectTasks();

  }

  toggleProjectTask(index: number) {

    const task = this.projectTasks[index];

    task.completed = !task.completed;

    const allTasks = this.taskService.getTasks();

    const taskIndex = allTasks.findIndex(
      (item: any) =>
        item.name === task.name &&
        item.projectIndex === this.projectIndex
    );

    if (taskIndex !== -1) {

      allTasks[taskIndex] = task;

      this.taskService.saveTasks(allTasks);

    }

    this.loadProjectTasks();

  }

  deleteProjectTask(index: number) {

    const task = this.projectTasks[index];

    const confirmed = confirm(
      'Are you really sure you want to delete this task?'
    );

    if (!confirmed) {
      return;
    }

    const allTasks = this.taskService.getTasks();

    const updatedTasks = allTasks.filter(
      (item: any) =>
        !(
          item.name === task.name &&
          item.projectIndex === this.projectIndex
        )
    );

    this.taskService.saveTasks(updatedTasks);

    this.loadProjectTasks();

  }

  openAiVideoWorkspace() {

    this.router.navigate([
      '/ai-video',
      this.projectIndex
    ]);

  }
  
  openRenderQueue() {

    this.router.navigate([
      '/render-queue',
      this.projectIndex
    ]);
  
  }

  goBack() {

    this.router.navigate(['/projects']);

  }

  openYouTubeOptimizer() {

    this.router.navigate([
      '/youtube-optimizer',
      this.projectIndex
    ]);
  
  }

}