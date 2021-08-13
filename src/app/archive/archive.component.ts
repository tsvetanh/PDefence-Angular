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

  //@ts-ignore
  requests: Request[];
  noMore: boolean = false;
  page: number = 1;

  constructor(private userService: UserService,
              private router: Router,
              private requestService: RequestService) { }

  nextPage(last: Request) {
    this.requestService.archNextPage(last).subscribe(
      (data) => {
        if (data.length > 0) {
          this.requests = data;
          this.noMore = false;
          this.page++;
        } else {
          this.noMore = true;
        }
      },
      err => console.log(err));
  }

  prevPage(first: Request) {
    this.requestService.archPrevPage(first).subscribe(
      (data) => {
        if (data.length > 0) {
          this.requests = data;
          this.noMore = false;
          this.page--;
        } else {
          this.noMore = true;
        }
      },
      err => console.log(err));
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
    this.requestService.getAllArchivedRequests().subscribe(data => {
      // @ts-ignore
      this.requests = data;
    });
  }

}
