import {Injectable} from '@angular/core';
import {Request} from "../model/request";
import {User} from "../model/user";
import {tap} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const apiURL = environment.api;

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }

  public save(data: { type: string, date: Date, hour: number}, email: string) {
    return this.http.post<Request>(`${apiURL}/request/save`, {data, email}, {withCredentials: true});
  }

  getRequestByDate(date: string): Observable<Request[]> {
    return this.http.post<Request[]>(`${apiURL}/request/getByDate`, {date}, {withCredentials: true});
  }
}
