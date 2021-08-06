import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AboutUsListComponent} from "./about-us-list/about-us-list.component";
import {UserFormComponent} from "./user-form/user-form.component";
import {VideoComponent} from "./video/video.component";
import {UserModule} from "../user/user.module";



@NgModule({
  declarations: [
    AboutUsListComponent,
    UserFormComponent,
    VideoComponent
  ],
  exports: [
    AboutUsListComponent,
    VideoComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    UserModule
  ]
})
export class HomeModule { }
