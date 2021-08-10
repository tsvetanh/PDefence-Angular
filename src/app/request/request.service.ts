import {Injectable} from '@angular/core';
import {Request} from "../model/request";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";


const apiURL = environment.api+"/request";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }

  public save(data: { type: string, date: Date, hour: number}, email: string) {
    return this.http.post<Request>(`${apiURL}/save`, {data, email}, {withCredentials: true});
  }

  getRequestsByDate(date: string): Observable<Request[]> {
    return this.http.post<Request[]>(`${apiURL}/getByDate`, {date}, {withCredentials: true});
  }

  getRequestsByEmail(email: string | undefined): Observable<Request[]> {
    return this.http.post<Request[]>(`${apiURL}/getByEmail`, email, {withCredentials: true});
  }

  public getAllRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(apiURL + "/all");
  }

}
