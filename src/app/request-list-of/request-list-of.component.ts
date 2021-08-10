import {Component, Input, OnInit} from '@angular/core';
import {Request} from "../model/request";
import {RequestService} from "../request/request.service";
import {UserService} from "../user/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-request-list-of',
  templateUrl: './request-list-of.component.html',
  styleUrls: ['./request-list-of.component.css']
})
export class RequestListOfComponent implements OnInit {

  @Input()
  email?: string | null
  requests: Request[] | undefined;

  constructor(private requestService: RequestService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let email = params['email'];
      if (email || email === "") {
        this.email = email;
      } else {
        this.router.navigate(['/allUsers'])
      }
    });
    this.requestService.getRequestsByEmail(this.email).subscribe(data => {
      // @ts-ignore
      this.requests = data;
      console.log(this.requests);
    });
  }

}
