import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-project-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-tasks.html',
  styleUrl: './project-tasks.scss'
})
export class ProjectTasks implements OnInit {

  tasks: any[] = [];

  constructor(
    private taskService: TaskService
  ) {}

  ngOnInit() {

    const savedTasks = this.taskService.getTasks();

    if (savedTasks.length > 0) {

      this.tasks = savedTasks;

    } else {

      this.tasks = [
        {
          name: 'Design UI',
          completed: false
        },
        {
          name: 'Create API',
          completed: true
        }
      ];

      this.taskService.saveTasks(this.tasks);

    }

  }

  addTask() {

    const taskName = prompt('Enter Task Name');

    if (taskName) {

      this.tasks.push({
        name: taskName,
        completed: false
      });

      this.taskService.saveTasks(this.tasks);

    }

  }

  toggleTask(index: number) {

    this.tasks[index].completed =
      !this.tasks[index].completed;

    this.taskService.saveTasks(this.tasks);

  }

  deleteTask(index: number) {

    this.tasks.splice(index, 1);

    this.taskService.saveTasks(this.tasks);

  }

}