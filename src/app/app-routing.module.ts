import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {HomeComponent} from "./home/home.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ProfileComponent} from "./profile/profile.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {RequestComponent} from "./request/request.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {RequestListComponent} from "./request-list/request-list.component";
import {MyRequestsComponent} from "./my-requests/my-requests.component";
import { UserDetailsComponent } from './user-details/user-details.component';
import {RequestListOfComponent} from "./request-list-of/request-list-of.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'about',
    component: AboutUsComponent
  },
  {
    path: 'service',
    component: RequestComponent
  },
  {
    path: 'allRequests',
    component: RequestListComponent
  },
  {
    path: "myRequests",
    component: MyRequestsComponent
  },
  {
    path: "requestsOf",
    component: RequestListOfComponent
  },
  {
    path: 'allUsers',
    component: UserListComponent
  },
  {
    path: 'userDetails',
    component: UserDetailsComponent
  },
  {
    path: 'contact',
    component: ContactUsComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
