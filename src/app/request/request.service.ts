import {Injectable} from '@angular/core';
import {Request} from "../model/request";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const apiURL = environment.api + "/request";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }

  public save(data: { type: string, date: Date, hour: number, description: string}, email: string) {
    return this.http.post<Request>(`${apiURL}/save`, {data, email}, {withCredentials: true});
  }

  getRequestsByDate(date: string): Observable<Request[]> {
    return this.http.post<Request[]>(`${apiURL}/getByDate`, {date}, {withCredentials: true});
  }

  getRequestsById(id: string): Observable<Request[]> {
    return this.http.post<Request[]>(`${apiURL}/getById`, {id}, {withCredentials: true});
  }

  getRequestsByEmail(email: string | null | undefined): Observable<Request[]> {
    return this.http.post<Request[]>(`${apiURL}/getByEmail`, email, {withCredentials: true});
  }

  public getAllCurrentRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(apiURL + "/all");
  }

  nextPage(last: Request): Observable<Request[]> {
    return this.http.post<Request[]>(`${apiURL}/nextPage`, last, {withCredentials: true});
  }

  prevPage(first: Request): Observable<Request[]> {
    return this.http.post<Request[]>(`${apiURL}/prevPage`, first, {withCredentials: true});

  }

  archNextPage(last: Request): Observable<Request[]> {
    return this.http.post<Request[]>(`${apiURL}/archNextPage`, last, {withCredentials: true});
  }

  archPrevPage(first: Request): Observable<Request[]> {
    return this.http.post<Request[]>(`${apiURL}/archPrevPage`, first, {withCredentials: true});

  }

  public getAllArchivedRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(apiURL + "/archived");
  }

  public cancelRequest(id: string): Observable<Request> {
    return this.http.post<Request>(`${apiURL}/cancel`, id, {withCredentials: true});
  }

  processRequest(id: string) {
    return this.http.post<Request>(`${apiURL}/process`, id, {withCredentials: true});
  }

  activate(id: string) {
    return this.http.post<Request>(`${apiURL}/activate`, id, {withCredentials: true});
  }


  getStatusCounts() {
    return this.http.get<number[]>(`${apiURL}/statusCount`, {withCredentials: true});
  }
}
