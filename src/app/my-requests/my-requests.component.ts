import { Component, OnInit } from '@angular/core';
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
              private  userService: UserService) {
  }

  ngOnInit() {
    this.requestService.getRequestsByEmail(this.userService.user?.email).subscribe(data => {
      // @ts-ignore
      this.requests = data;
      console.log(this.requests)
    });
  }
}
