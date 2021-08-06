import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {environment} from "../../environments/environment";

  const usersUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {
    // this.usersUrl = 'https://project-defend.herokuapp.com/users';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(usersUrl + "/users");
  }

  public save(user: User) {
    console.log(user);
    return this.http.post<User>(usersUrl, user);
  }
}

