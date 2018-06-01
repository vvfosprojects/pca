import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ApplicationRowPage } from '../models/application-row-page.model';

const APIURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class GetApplicationRowsService {
  constructor(private http: HttpClient) { }

  public getRows(startIndex: number, howMany: number): Observable<ApplicationRowPage> {
    let action = "/application";

    let params = new HttpParams()
      .set('startIndex', startIndex.toString())
      .set('howMany', howMany.toString());

    return this.http.get<ApplicationRowPage>(APIURL + action, { params: params } );
  }
}
