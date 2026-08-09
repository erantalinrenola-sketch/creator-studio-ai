import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private storageKey = 'crm-users';

  getUsers() {

    const users = localStorage.getItem(this.storageKey);

    return users ? JSON.parse(users) : [];

  }

  saveUsers(users: any[]) {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(users)
    );

  }

}