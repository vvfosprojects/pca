import { Injectable } from '@angular/core';
import { Observable, of as ObservableOf } from 'rxjs';
import * as moment from "moment";
import { AuthResult } from '../models/authResult.model';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceFake implements CanActivate {
  constructor() {
  }

  login(username: string, password: string) {
    return ObservableOf(new AuthResult(true, "fakeToken", moment().add(1, 'y').toDate()))
  }

  logout() {
  }

  public isLoggedIn(): boolean {
    return true;
  }

  isLoggedOut(): boolean {
    return false;
  }

  getExpiration() {
    return moment().add(1, 'y').toDate();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }
}
