import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Request} from "../model/request";
import {RequestService} from "../request/request.service";
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  requests: Request[] | undefined;

  constructor(private requestService: RequestService,
              private  userService: UserService,
              private router: Router) {
  }

  cancel(id: string): void {
    this.requestService.cancelRequest(id).subscribe(
        (data) =>{
          this.ngOnInit();
        },
      err => {
        console.log(err);
      });
    // this.router.navigate(['/myRequests'])
  }

  ngOnInit() {
    this.requestService.getRequestsByEmail(this.userService.user?.email).subscribe(data => {
      // @ts-ignore
      this.requests = data;
    });
  }
}
