import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UserService} from "./service/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import {HomeComponent} from "./home/home.component";
import {HomeModule} from "./home/home.module";
import {UserModule} from "./user/user.module";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    UserModule,
    HomeModule
  ],
  providers: [UserService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
