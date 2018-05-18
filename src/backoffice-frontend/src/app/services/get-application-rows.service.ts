import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApplicationRow } from '../models/application-row.model';
import { Observable } from 'rxjs';

const APIURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class GetApplicationRowsService {
  constructor(private http: HttpClient) { }

  public getRows(startIndex: number, howMany: number): Observable<ApplicationRow[]> {
    let action = "/applicationRows";

    let params = {
      startIndex: startIndex,
      howMany: howMany
    }

    return this.http.get<ApplicationRow[]>(APIURL + action);
  }
}
