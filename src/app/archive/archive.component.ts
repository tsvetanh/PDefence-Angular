import { Component, OnInit } from '@angular/core';
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
import {RequestService} from "../request/request.service";
import { Request } from "../model/request";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  requests: Request[] | undefined;

  constructor(private userService: UserService,
              private router: Router,
              private requestService: RequestService) { }

  ngOnInit() {
    if (!this.userService.isLogged) {
      this.router.navigate(['/']);
      return;
    }
    if (!this.userService.admin) {
      this.router.navigate(['/']);
      return;
    }
    this.requestService.getAllArchivedRequests().subscribe(data => {
      // @ts-ignore
      this.requests = data;
    });
  }

}
