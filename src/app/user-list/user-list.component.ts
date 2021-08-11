import { Component, OnInit } from '@angular/core';
import {UserService} from "../user/user.service";
import {User} from "../model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] | undefined;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    if (!this.userService.isLogged) {
      this.router.navigate(['/']);
      return;
    }
    if (!this.userService.admin) {
      this.router.navigate(['/']);
      return;
    }
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
    if (!this.userService.isLogged || !this.userService.admin) {
      this.router.navigate(['/']);
    }
  }

}
