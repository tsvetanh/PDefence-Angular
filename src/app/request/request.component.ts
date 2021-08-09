import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "../shared/validators";
import {RequestService} from "./request.service";

@Component({
  selector: 'app-service',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit, OnDestroy {

  killSubscription = new Subject();
  form: FormGroup;
  freeHours: number[] | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private requestService: RequestService,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      type: [''],
      date: [''],
      description: [''],
      hour: ['']
    });
  }

  save(): void {
    if (this.form.invalid) { return; }
    const { type, date, hour } = this.form.value;
    let user = localStorage.getItem('USER');
    // @ts-ignore
    let email = JSON.parse(user).email
    this.requestService.save({ type, date, hour}, email)
      .subscribe({
      next: () => {
        const redirectUrl = this.activatedRoute.snapshot.queryParams.redirectUrl || '/profile';
        this.router.navigate([redirectUrl]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getByDate(date: HTMLInputElement): void {
    if (date.value) {
      this.requestService.getRequestByDate(date.value).subscribe(data => {
        this.freeHours = [9, 10, 11, 12, 13, 14, 15, 16];
        for (const request of data) {
          let index = this.freeHours.indexOf(<number>request.hour);
          // if (index > -1) {
          this.freeHours.splice(index,1);
          // }
        }
      });
    }
  }

  ngOnInit(): void {
    if (!this.userService.isLogged) {
      this.router.navigate(['/']);
    }

    let date = document.getElementById("date");
    // @ts-ignore
    date.min = new Date().toISOString().split("T")[0];
    // @ts-ignore
    date.value = new Date().toISOString().split("T")[0];

  }

  ngOnDestroy(): void {
    this.killSubscription.next();
    this.killSubscription.complete();
  }


}
