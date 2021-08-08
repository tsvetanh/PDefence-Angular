import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {emailValidator, sameValueAsFactory} from 'src/app/shared/validators';
import {Subject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy{
  emailValidator = emailValidator;
  killSubscription = new Subject();
  form: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  login(): void {
    if (this.form.invalid) { return; }
    const { email, password } = this.form.value;
    this.userService.login({ email, password }).subscribe({
      next: () => {
        const redirectUrl = this.activatedRoute.snapshot.queryParams.redirectUrl || '/profile';
        this.router.navigate([redirectUrl]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.killSubscription.next();
    this.killSubscription.complete();
  }

}
