import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";

import { AuthService } from '../services/auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
 })
export class NavbarComponent implements OnInit {
  
 
  fileUrl;
  
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

   
 private downloadFile() {
       
  
      this.fileUrl='http://www.vigilfuoco.it/aspx/ReturnDocument.aspx?IdDocumento=12498';
     
  } 

} 
 

