import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";
import {Params} from "@angular/router";

const apiURL = environment.api;

@Injectable()
export class UserService {
  user: User | null = JSON.parse(<string>localStorage.getItem('USER'));

  get isLogged(): boolean {
    return !!this.user;
  }

  get admin(): boolean {
    return this.user?.roles?.indexOf("ADMIN") === 1;
  }

  constructor(private http: HttpClient) {
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(apiURL + "/users");
  }


  public login(data: { email: string; password: string }) {
    return this.http.post<User>(`${apiURL}/users/login`, data, {withCredentials: true}).pipe(
      tap((user) => {
        this.saveUserToStorage(user);
      })
    );
  }

  public register(data: { name: string; email: string; tel: string; password: string }) {
    return this.http.post<User>(`${apiURL}/users/register`, data, {withCredentials: false}).pipe(
      tap((user) => {
        this.saveUserToStorage(user);
      }));
  }

  getUserByEmail(email: string | null | undefined): Observable<User> {
    return this.http.post<User>(`${apiURL}/users/get`, email, {withCredentials: true});
  }

  logout() {
    // return this.http.post<User>(`${apiURL}/users/logout`, {}, { withCredentials: true }).pipe(
    //   tap(() => this.user = null)
    // );
    this.removeUserFromStorage()
  }

  getProfileInfo() {
    return this.http.get<User>(`${apiURL}/users/profile`, {withCredentials: true}).pipe(
      tap((user) => this.user = user)
    )
  }

  updateProfile(data: { username: string; email: string; tel: string; }) {
    return this.http.put<User>(`${apiURL}/users/profile`, data, {withCredentials: true}).pipe(
      tap((user) => {
        this.saveUserToStorage(user);
      })
    );
  }
  private saveUserToStorage(user: User) {
    // @ts-ignore
    user.password = undefined;
    this.user = user;
    localStorage.setItem('USER', JSON.stringify(user));
  }

  private removeUserFromStorage() {
    this.user = null;
    localStorage.removeItem("USER")
  }

}

