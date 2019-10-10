import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpidJwtService } from '../../service/spid-jwt.service';
import { SpidAttribute } from '../model/spid-attribute.model';

@Component({
  selector: 'app-spid',
  templateUrl: './spid-jwt.component.html',
  styleUrls: ['./spid-jwt.component.css']
})
export class SpidJwtComponent implements OnInit {

  private spidAttributes: SpidAttribute;
  private key = Object.keys;

  constructor(
    private spidJwtService: SpidJwtService) {

    }

  ngOnInit() {
    if(this.isLogin()){
      this.getAttributes();
    }
  }

  public login(){
    this.spidJwtService.doLogin();
  }

  public logout(){
    this.spidJwtService.doLogout();
  }

  public isLogin(){
    return this.spidJwtService.isLoggedIn();
  }

  public isLogout(){
    return !this.spidJwtService.isLoggedIn();
  }

  private getAttributes(){
      this.spidAttributes = this.spidJwtService.getSpidAttributes();
  }
}
