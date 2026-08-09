import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private storageKey = 'crm-tasks';

  getTasks() {

    const tasks = localStorage.getItem(this.storageKey);

    return tasks ? JSON.parse(tasks) : [];

  }

  saveTasks(tasks: any[]) {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(tasks)
    );

  }

}