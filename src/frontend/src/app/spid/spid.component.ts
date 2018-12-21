import { Component, OnInit } from '@angular/core';
import { SpidService } from '../../service/spid.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthResult } from '../model/auth-result.model';
import { of as observableOf, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-spid',
  templateUrl: './spid.component.html',
  styleUrls: ['./spid.component.css']
})
export class SpidComponent implements OnInit {

  private BACKENDBASEURL = environment.backendBaseUrl;
  private spidData = [];
  private key = Object.keys;

  constructor(
    private spidService: SpidService, 
    private router: Router) {}

  ngOnInit() {
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

  public linkLogin(){
    const link = '/Authentication/Spid/Login/Default.aspx';
    window.open( this.BACKENDBASEURL + link , '_self');
  }

  public linkLogout(){
    const link = '/Authentication/Spid/Logout/Default.aspx';
    window.open( this.BACKENDBASEURL + link , '_self');
    this.spidService.logout();
  }

  public isAuthenticated(){
    return this.spidService.isLoggedIn();
  }

  private getAttributes(){
    this.spidService.getSpidAttributes()
    .subscribe(
      res => {
        this.spidData = res;
      },
      err => {
        console.log(err);
      });
  }
}
