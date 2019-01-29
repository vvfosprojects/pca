import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {of as observableOf, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';


const BACKENDURL = environment.backendUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class SpidService {

  private spidAttributesUrl = '/spid/attributes';

  constructor(private http: HttpClient) {
  }

  attributes(): Observable<any> {
    return this.http.get<any>(BACKENDURL + this.spidAttributesUrl, httpOptions);
  }

}
