import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";
import {LocalStorage} from "../core/injection-tokens";

const apiURL = environment.api;

@Injectable()
export class UserService {
  user: User | null = JSON.parse(<string>localStorage.getItem('USER'));

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(apiURL + "/users");
  }


  public login(data: { email: string; password: string }) {
    return this.http.post<User>(`${apiURL}/users/login`, data, {withCredentials: true}).pipe(
      tap((user) => {
        this.user = user;
        this.saveUserToStorage(user);
      })
    );
  }

  public register(data: { name: string; email: string; tel: string; password: string }) {
    return this.http.post<User>(`${apiURL}/users/register`, data, {withCredentials: false}).pipe(
      tap((user) => {
        this.user = user
        this.saveUserToStorage(user);
      }));
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
      tap((user) => this.user = user)
    );
  }
  private saveUserToStorage(user: User) {
    localStorage.setItem('USER', JSON.stringify(user));
    console.log(localStorage);
  }

  private removeUserFromStorage() {
    this.user = null;
    localStorage.removeItem("USER")
  }


}

