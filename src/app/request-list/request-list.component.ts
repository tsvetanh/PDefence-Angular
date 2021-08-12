import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";
import {UserService} from "../user/user.service";
import {RequestService} from "../request/request.service";
import {Request} from "../model/request"
import {Router} from "@angular/router";

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  // @ts-ignore
  requests: Request[];
  noMore: boolean = false;

  constructor(private requestService: RequestService,
              private userService: UserService,
              private router: Router) {
  }

  cancel(id: string): void {
    this.requestService.cancelRequest(id).subscribe(
      (data) => {
        this.ngOnInit();
      },
      err => {
        console.log(err);
      });
  }

  process(id: string) {
    this.requestService.processRequest(id).subscribe(
      (data) => {
        this.ngOnInit();
      },
      err => {
        console.log(err);
      });
  }

  activate(id: string) {
    this.requestService.activate(id).subscribe(
      (data) => {
        this.ngOnInit();
      },
      err => {
        console.log(err);
      });
  }

  nextPage(last: Request) {
    this.requestService.nextPage(last).subscribe(
      (data) => {
        if (data.length > 0) {
          this.requests = data;
          this.noMore = false;
        } else {
          this.noMore = true;
        }
      },
      err => console.log(err));
  }

  prevPage(first: Request) {
    this.requestService.prevPage(first).subscribe(
      (data) => {
        if (data.length > 0) {
          this.requests = data;
          this.noMore = false;
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
    this.requestService.getAllCurrentRequests().subscribe(data => {
      // @ts-ignore
      this.requests = data;
    });
  }


}
