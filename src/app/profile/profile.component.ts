import {Component, OnInit} from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  inUpdateMode = false;
  // form: FormGroup;

  get user() {
    return this.userService.user;
  }

  constructor(private userService: UserService,
              private router: Router) { }

  updateProfile(form: NgForm): void {
    if (form.invalid) { return; }
    console.log(form.value);
    this.userService.updateProfile(form.value).subscribe({
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
  }

}
