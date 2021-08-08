import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    if (!this.userService.isLogged) {
      this.router.navigate(['/']);
    }
  }

}
