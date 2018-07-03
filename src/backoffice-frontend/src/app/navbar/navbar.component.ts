import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private searchKey: string;
 
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  private ricerca(event) {
  
    window.localStorage.setItem('searchChiave', this.searchKey);

      let searchChiave = window.localStorage.getItem('searchChiave');

      this.searchKey = searchChiave;

    console.log('prima navigate', this.searchKey)

    this.router.navigate(['/control-panel']);
     
  }
 
   private clearSearchText(): void {
    this.searchKey = null;
    window.localStorage.setItem('searchChiave', this.searchKey);
    this.router.navigate(['/control-panel']);
  }
 
}
