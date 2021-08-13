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

  ngOnInit() {
    if (!this.userService.isLogged) {
      this.router.navigate(['/']);
      return;
    }
    if (!this.userService.admin) {
      this.router.navigate(['/']);
      return;
    }
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
    });
  }

}
