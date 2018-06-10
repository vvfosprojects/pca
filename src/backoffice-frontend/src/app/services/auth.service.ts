import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, shareReplay } from 'rxjs/operators';
import * as moment from "moment";
import { environment } from '../../environments/environment';

import { AuthResult } from '../models/authResult.model';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

const APIURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string) {
    const action = "/auth";

    const httpParams = new HttpParams()
      .append("username", username)
      .append("password", password);

    return this.http.post<AuthResult>(APIURL + action, httpParams)
      .pipe(tap((res: AuthResult) => {
        if (res.success)
          this.setSession(res);
      }))
      .pipe(shareReplay());
  }

  private setSession(authResult: AuthResult) {
    localStorage.setItem('jwtToken', authResult.jwtToken);
    localStorage.setItem("expirationTime", JSON.stringify(authResult.expirationDate);
  }

  logout() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("expirationTime");
  }

  public isLoggedIn(): boolean {
    const expiration = localStorage.getItem("expirationTime");
    if (!expiration)
      return false;

    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expirationTime");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLoggedIn())
      return true;
    else
    {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
