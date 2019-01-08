import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap, shareReplay } from 'rxjs/operators';
import * as moment from "moment";
import { environment } from '../environments/environment';
import { of as observableOf, Observable, throwError } from 'rxjs';
import { AuthResult } from '../app/model/auth-result.model';
import { SpidAttributeResult } from '../app/model/spid-attribute-result.model';
import { catchError, map } from 'rxjs/operators';

const BACKENDURL = environment.backendUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }),
  withCredentials: true
};


@Injectable({
  providedIn: 'root'
})
export class SpidService {

  constructor(private http: HttpClient) {}

  public getJwtToken(){
    const action = "/spid/token";
    return this.http.get<AuthResult>(BACKENDURL + action, httpOptions)
      .pipe(tap((res: AuthResult) => {
        if (res.success){
          this.setSession(res);
        }
      }))
      .pipe(shareReplay());
  }

  public getSpidAttributes() : Observable<SpidAttributeResult>{
    const action = "/spid/attributes";
    return this.http.get<SpidAttributeResult>(BACKENDURL + action, httpOptions);
  }

  public logout() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("expirationTime");
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  public isLoggedIn(): boolean {
    const expiration = localStorage.getItem("expirationTime");
    if (!expiration)
      return false;

    const expiresAt = JSON.parse(expiration);
    return moment().isBefore(moment(expiresAt));
  }

  setSession(authResult: AuthResult) {
    localStorage.setItem('jwtToken', authResult.jwtToken);
    localStorage.setItem("expirationTime", JSON.stringify(authResult.expirationDate));
  }

}
