import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit {

  users: any[] = [];

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {

    const savedUsers = this.userService.getUsers();

    if (savedUsers.length > 0) {

      this.users = savedUsers;

    } else {

      this.users = [
        {
          name: 'Pravin Kumar',
          role: 'Senior DevOps Engineer'
        },
        {
          name: 'John',
          role: 'Frontend Developer'
        }
      ];

      this.userService.saveUsers(this.users);

    }

  }

  addUser() {

    const name = prompt('Enter User Name');

    if (!name) {
      return;
    }

    const role = prompt('Enter User Role');

    if (!role) {
      return;
    }

    this.users.push({
      name: name,
      role: role
    });

    this.userService.saveUsers(this.users);

  }

  deleteUser(index: number) {

    const confirmed = confirm(
      'Are you sure you want to delete this user?'
    );

    if (confirmed) {

      this.users.splice(index, 1);

      this.userService.saveUsers(this.users);

    }

  }

}