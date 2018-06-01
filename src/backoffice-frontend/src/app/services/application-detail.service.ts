import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ApplicationDetail } from '../models/application-detail.model';

const APIURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApplicationDetailService {
  constructor(private http: HttpClient) { }

  public getApplication(startIndex: number, howMany: number): Observable<ApplicationDetail> {
    let action = "/applicationDetail";

 /*    let params = {
      id: id
     }
 */
    return this.http.get<ApplicationDetail>(APIURL + action);
  }
}


