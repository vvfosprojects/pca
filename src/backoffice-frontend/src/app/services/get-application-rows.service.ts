import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    let action = "/applicationRows";

    let params = {
      startIndex: startIndex,
      howMany: howMany
    }

    return this.http.get<ApplicationRowPage>(APIURL + action);
  }
}
