import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";

import { AuthService } from '../services/auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GetApplicationRowsService } from '../services/get-application-rows.service';

const APIURL = environment.apiUrl;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private fileUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private getRows: GetApplicationRowsService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  private exportData() {
    const generateDownloadKeyAction = "/export/getDownloadAuthKey";
    this.http.post(APIURL + generateDownloadKeyAction, {})
      .subscribe((response: any) => {
        let currentSearchKey = this.getRows.getSearchKey();
        const downloadAction = "/export?searchKey=" + currentSearchKey + "&downloadAuthKey=" + response.authKey;
        window.location.href = APIURL + downloadAction;
      });
  }

}


