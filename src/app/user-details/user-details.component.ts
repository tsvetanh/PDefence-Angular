import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {User} from "../model/user";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  inUpdateMode = false;
  user: User | undefined;
  // form: FormGroup;
  @Input()
  email?: string | null

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  updateProfile(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    this.userService.editProfile(form.value).subscribe({
      next: () => {
        this.inUpdateMode = false;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnInit(): void {
    if (!this.userService.isLogged) {
      this.router.navigate(['/']);
    }
    this.route.queryParams.subscribe(params => {
      let email = params['email'];
      if (email || email === "") {
        this.email = email;
      } else {
        this.router.navigate(['/allUsers'])
      }
    });
    this.userService.getUserByEmail(this.email).subscribe( data => {
      this.user = data;
    });
  }
}
