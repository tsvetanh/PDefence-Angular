import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {UserService} from "../user/user.service";
import {RequestService} from "../request/request.service";
import { Request } from "../model/request"

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  requests: Request[] | undefined;

  constructor(private requestService: RequestService) {
  }

  ngOnInit() {
    this.requestService.getAllRequests().subscribe(data => {
      // @ts-ignore
      this.requests = data;
      console.log(this.requests)
    });
  }
}
