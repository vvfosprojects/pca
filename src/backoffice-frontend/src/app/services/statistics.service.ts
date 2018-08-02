import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Statistics } from '../models/statistics.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const APIURL = environment.apiUrl;

@Injectable()
export class StatisticsService {
  
  constructor(
    private http: HttpClient
  ) { }
  
  public getStatistics(): Observable<Statistics> {
    const action = "/statistics";

    return this.http.get<Statistics>(APIURL + action);
  }
}
