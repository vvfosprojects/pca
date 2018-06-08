import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ApplicationDetail } from '../models/application-detail.model';

const APIURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApplicationDetailService {
  constructor(private http: HttpClient) { }

  public getApplication(id: string): Observable<ApplicationDetail> {
    const action = "/application";
    const params = new HttpParams().set('id', id);

    return this.http.get<ApplicationDetail>(APIURL + action, { params });
  }
}


