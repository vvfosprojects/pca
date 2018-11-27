import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { of as observableOf, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


const BACKENDURL = environment.backendUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class SpidService {

  private spidLoginUrl = '/spid/login';
  private spidLogOutUrl = '/spid/logout';

  constructor(private http: HttpClient) { }

  login(): Observable<any> 
  {
    return this.http.get<any>(BACKENDURL + this.spidLoginUrl, httpOptions);
  }

  logout(): Observable<any> 
  {
    return this.http.get<any>(BACKENDURL + this.spidLogOutUrl, httpOptions);
  }

}
