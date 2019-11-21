import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SpidAttribute } from "../app/model/spid-attribute.model";
import { Base64 } from 'js-base64';
import { environment } from '../environments/environment';
import { HttpParameterCodec } from "@angular/common/http";
import * as jwt from 'jsonwebtoken';
import * as jwt_decode from 'jwt-decode';
import * as moment from "moment";

const CASBASEURL = environment.casUrl;
const SECRET = environment.secretJwt;

@Injectable({
  providedIn: 'root'
})

export class SpidJwtService {

  constructor(
    private location: Location, 
    private router: Router) {    
      this.setSession();
  }

  public doLogin() {
    let SERVICE = `?service=${encodeURIComponent(window.location.href)}`;
    window.location.href = CASBASEURL + SERVICE;
  }            

  public doLogout() {
    let SERVICE = `/logout?service=${encodeURIComponent(window.location.href)}`;
    window.location.href = CASBASEURL + SERVICE;
    localStorage.removeItem("jwtToken");
  }

  public isLoggedIn(): boolean {
    let jwtToken = this.getJwtToken();
    let isLoggedIn = jwtToken ? (!this.isTokenExpired(jwtToken)) : false;
    return isLoggedIn;
  }

  public getJwtToken(): string {
    const jwtTokenStored = localStorage.getItem("jwtToken");
    let jwtToken = jwtTokenStored ? this.decodeToken(jwtTokenStored) : null; 
    return jwtToken;
  }

  public getSpidAttributes(): SpidAttribute {
    const jwtToken = this.getJwtToken();
    const jwtTokenJson = JSON.parse(jwtToken);
    return new SpidAttribute (
      jwtTokenJson["spidcode"],
      jwtTokenJson["nome"],
      jwtTokenJson["cognome"],
      jwtTokenJson["codicefiscale"],
      jwtTokenJson["ragionesociale"],
      jwtTokenJson["indirizzo"],
      jwtTokenJson["piva"],
      jwtTokenJson["numtel"],
      jwtTokenJson["email"],
      jwtTokenJson["pec"],
      jwtTokenJson["luogonascita"],
      jwtTokenJson["provnascita"],
      jwtTokenJson["datanascita"],
      jwtTokenJson["sesso"]
    )
  }

  private isTokenExpired(jwtToken: string): boolean {
    if (jwtToken){
      let jwtTokenJson = JSON.parse(jwtToken);
      let exp = jwtTokenJson["exp"];
      return moment().isAfter(moment.unix(exp));
    }
    return true;
  }

  /*
  private decodeToken(ticket: string): string {
    try {
      let jwtToken = jwt_decode(ticket); 
      return JSON.stringify(jwtToken);
    } catch(err) {
      console.error("Failed to authenticate token: "+ err);      
    }
    return;
  }
  */
  
  private decodeToken(ticket: string): string {
    try {
      var jwtToken = jwt.verify(ticket, SECRET);
      return JSON.stringify(jwtToken);
    } catch(err) {
      console.error("Failed to authenticate token: "+ err);      
    }
  }

  private setSession() {
    const matches = window.location.href.match(/(.*)[&?]ticket=([^&?]*)$/);
    if (matches) {
      const [_, ourUrl, ticket] = matches;
      let jwtToken = this.decodeToken(ticket);
      let isTokenExpired = this.isTokenExpired(jwtToken);
      if(!isTokenExpired){
        localStorage.setItem('jwtToken', ticket);
        let currentUrlPath = this.router.url.split('?')[0];
        this.location.replaceState(currentUrlPath.substring(1, currentUrlPath.length));
      } else {
        console.error("Failed to authenticate, token expired")    
      }
    }
  }

}
