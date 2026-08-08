import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private storageKey = 'crm-projects';

  getProjects() {
    const projects = localStorage.getItem(this.storageKey);

    return projects ? JSON.parse(projects) : [];
  }

  saveProjects(projects: any[]) {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(projects)
    );
  }
}