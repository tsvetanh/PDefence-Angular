import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private userService: UserService,
              private router: Router) { }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get name(): string {
    return this.userService.user?.name || '';
  }
  logout(): void {
    this.userService.logout()
    //   .subscribe(() => {
    //   this.router.navigate(['/']);
    // });
    this.router.navigate(['/home'])
  }
}
