import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SpidAttribute } from "../app/model/spid-attribute.model";
import { Base64 } from 'js-base64';
import { environment } from '../environments/environment';
import * as jwt from 'jsonwebtoken';
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
    const jwtToken = this.getJwtToken();
    if(jwtToken)
      return !this.isTokenExpired(jwtToken);
  }

  public getJwtToken(): string {
    const jwtToken = localStorage.getItem("jwtToken");
    if(jwtToken)  
      return this.decodeToken(jwtToken);  
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
    let isExpirationDate: boolean = true;
    if (jwtToken){
      const jwtTokenJson = JSON.parse(jwtToken);
      let exp = jwtTokenJson["exp"];
      isExpirationDate = exp ? (moment().isAfter(moment.unix(exp))) : isExpirationDate;
    }
    return isExpirationDate;
  }

  private decodeToken(ticket: string): string {
    try {
      let jwtTokenBase64Encoded = jwt.verify(ticket, SECRET);
      return Base64.decode(JSON.stringify(jwtTokenBase64Encoded));
    } catch(err) {
      console.error("Failed to authenticate token: "+ err);      
    }
    return;
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
