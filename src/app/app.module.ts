import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import {HomeComponent} from "./home/home.component";
import {HomeModule} from "./home/home.module";
import {UserModule} from "./user/user.module";
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RequestComponent } from './request/request.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RequestListComponent } from './request-list/request-list.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import {UserListComponent} from "./user-list/user-list.component";
import { UserDetailsComponent } from './user-details/user-details.component';
import { RequestListOfComponent } from './request-list-of/request-list-of.component';
import { ArchiveComponent } from './archive/archive.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ProfileComponent,
    AboutUsComponent,
    RequestComponent,
    ContactUsComponent,
    RequestListComponent,
    MyRequestsComponent,
    UserListComponent,
    UserDetailsComponent,
    RequestListOfComponent,
    ArchiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    UserModule,
    HomeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
