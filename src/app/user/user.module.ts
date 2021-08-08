import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./user.service";


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule {
}
