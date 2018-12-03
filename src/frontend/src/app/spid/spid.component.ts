import { Component, OnInit } from '@angular/core';
import { SpidService } from '../../service/spid.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { SpidResult } from '../model/spid-result.model';
import { of as observableOf, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-spid',
  templateUrl: './spid.component.html',
  styleUrls: ['./spid.component.css']
})
export class SpidComponent implements OnInit {

  private BACKENDBASEURL = environment.backendBaseUrl;
  private authenticated : boolean = false;
  private spidData: any;
  private key = Object.keys;

  private spidLoginUrl =  '/Authentication/Spid/Login/Default.aspx';
  private spidLogOutUrl = '/Authentication/Spid/Logout/Default.aspx';


  constructor(private spidService: SpidService,
    private router: Router) {
   }

  ngOnInit() {
    this.spidService.login().subscribe(
      response =>{
      this.spidData = response;
        if(typeof this.spidData != 'undefined' && this.spidData){
          console.log(this.spidData.submit);
          this.authenticated = true;
        }
      },
      err => {
      console.log(err);
      });
  }

  login(){
    window.open( this.BACKENDBASEURL + this.spidLoginUrl , '_self');
  }

  logout(){
    this.authenticated = false;
    window.open( this.BACKENDBASEURL + this.spidLogOutUrl , '_self');
  }


  isAuthenticated(){
    return this.authenticated;
  }

}
