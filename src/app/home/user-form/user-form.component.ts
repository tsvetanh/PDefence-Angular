import { Component } from '@angular/core';
import {User} from "../../model/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  user: User;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    this.user = new User();
  }

  // onSubmit() {
  //   this.userService.login(this.user).subscribe();
  //
  //     // .subscribe(result => this.gotoUserList());
  //   this.gotoUserList();
  // }

  gotoUserList() {
    this.router.navigate(['/users']);
  }

  loginForm() {
    let logForm = document.getElementsByTagName("app-login")[0];
    let regForm = document.getElementsByTagName("app-register")[0];
    // @ts-ignore
    regForm.style.display = "none";
    // @ts-ignore
    logForm.style.display = "block";


  }

  registerForm() {
    let regForm = document.getElementsByTagName("app-register")[0];
    let logForm = document.getElementsByTagName("app-login")[0];
    // @ts-ignore
    logForm.style.display = "none";
    // @ts-ignore
    regForm.style.display = "block";

  }
}
