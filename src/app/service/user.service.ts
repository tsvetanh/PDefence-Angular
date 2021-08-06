import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";

const apiURL = environment.api;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User | null | undefined = undefined;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) { }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(apiURL + "/users");
  }

  // public login(user: User) {
  //   console.log(user);
  //   return this.http.post<User>(apiURL, user);
  // }

  login(data: { email: string; password: string }) {
    return this.http.post<User>(`${apiURL}/users/login`, data, { withCredentials: true }).pipe(
      tap((user) => this.user = user)
    );
  }

  register(data: { name: string; email: string; tel: string; password: string }) {
    console.log(data);
    return this.http.post<User>(`${apiURL}/users/register`, data, { withCredentials: false }).pipe(
      tap((user) => this.user = user)
    );
  }

}

