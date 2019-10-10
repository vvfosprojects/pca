import { Component, OnInit } from '@angular/core';
import { SpidService } from '../../service/spid.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthResult } from '../model/auth-result.model';
import { SpidAttributeResult } from '../model/spid-attribute-result.model';
import { of as observableOf, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-spid',
  templateUrl: './spid.component.html',
  styleUrls: ['./spid.component.css']
})
export class SpidComponent implements OnInit {

  BACKENDBASEURL = environment.backendBaseUrl;
  private spidAttributeResult : SpidAttributeResult;
  private key = Object.keys;

  constructor(
    private spidService: SpidService, 
    private router: Router) {}

  ngOnInit() {
    this.isLogout() ? this.getToken() : this.getAttributes();
  }

  public login(){
    this.spidService.doLogin();
  }

  public logout(){
    this.spidService.doLogout();
  }

  public isLogin(){
    return this.spidService.isLoggedIn();
  }

  public isLogout(){
    return this.spidService.isLoggedOut();
  }

  public getToken(){
    this.spidService.getJwtToken()
     .subscribe(
       (res: AuthResult) => {
         if (res.success){
          this.getAttributes();
         }
       },
       err => {
        console.log(err);
       }
    );
  }

  public getAttributes(){
    this.spidService.getSpidAttributes()
    .subscribe(
      res => {
        this.spidAttributeResult = res;
      },
      err => {
        console.log(err);
      });
  }

}
