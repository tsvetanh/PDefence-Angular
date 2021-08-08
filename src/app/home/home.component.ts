import { Component, OnInit } from '@angular/core';
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.userService.isLogged) {
      this.router.navigate(['/profile']);
    }
  }

}
