import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";

import { AuthService } from '../services/auth.service';
// import { Http, ResponseContentType } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';


import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
 })
export class NavbarComponent implements OnInit {
  private searchKey: string;
  private filename: string;
 
  fileUrl;
  
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  /*   const data = 'some text';
    const blob = new Blob([data], { type: 'application/octet-stream' });
    
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl
    (window.URL.createObjectURL(blob)); */
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

   
 private downloadFile() {
  /* const httpOptions = {
    headers: new HttpHeaders({ 'responseType':  'ResponseContentType.Blob',
    'Content-Type':  'application/vnd.ms-excel'})}; 
    return this.http.get('https://files' + this.filename, httpOptions)  
    .subscribe(res  => {
           console.log('start download:',res);
  */

    /*  return this.http.get('file:///C:/Users/FRSDNL67E67H501U/Downloads/' + this.fileUrl, {responseType: 'blob'})
    .subscribe(response => {
     const blob = new Blob([response], { type: 'application/pdf' });    //application/octet-stream    text/csv
 */

       
      console.log("sono qui");
      const data = 'some text';
      console.log(data);
      const blob = new Blob([data], { type: 'application/pdf' }); 
   
     
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl
      (window.URL.createObjectURL(blob));
      // const url= window.URL.createObjectURL(blob);
     /*  console.log('start download:',url);
      window.open(url); */
  
      // }); 
      
 
    /*   var url = window.URL.createObjectURL(res.data);
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = res.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
     }, error => {
          console.log('download error:', JSON.stringify(error));
     }, () => {
          console.log('Completed file download.') 
    });*/
  } 


  /*--------
  getTextFile(filename: string) {
        return this.http.get(filename, {responseType: 'blob'})
      .pipe(
        tap( // Log the result or error
          data => this.log(filename, data),
          error => this.logError(filename, error)
        )
      );
  }

  downloadfiletesto() {
    this.getTextFile('assets/textfile.txt')
      .subscribe(results => this.contents = results);
  }
  -------- */
 
}



/*
export function downloadFile(blob: any, type: string, filename: string): string {
const url = window.URL.createObjectURL(blob); // <-- work with blob directly

// create hidden dom element (so it works in all browsers)
const a = document.createElement('a');
a.setAttribute('style', 'display:none;');
document.body.appendChild(a);

// create file, attach to hidden element and open hidden element
a.href = url;
a.download = filename;
a.click();
return url;
}
*/
