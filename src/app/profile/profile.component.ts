import { Component } from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import {UserService} from "../service/user.service";

@Component({
  selector: 'softuni-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  inUpdateMode = false;
  // form: FormGroup;

  get user() {
    return this.userService.user;
  }

  constructor(private userService: UserService) { }

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

}
