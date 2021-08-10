import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
  }

  getName(): string {
    // @ts-ignore
    return this.userService.user.name
  }

  getEmail(): string {
    // @ts-ignore
    return this.userService.user.email
  }

  send() {
    this.router.navigate(['/']);
  }
}
