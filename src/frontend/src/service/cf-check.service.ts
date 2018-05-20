import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Anagrafica } from '../app/model/anagrafica.model';
import { CfCheckOutcome } from '../app/model/cf-check-outcome.model';
import { Observable } from 'rxjs';

const BACKENDURL = environment.backendUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class CfCheckService {
  private cfCheckUrl = '/cfCheck';

  constructor(private http: HttpClient) { }

  public cfCheck(anagrafica: Anagrafica): Observable<CfCheckOutcome> {
    return this.http.post<CfCheckOutcome>(
      BACKENDURL + this.cfCheckUrl,
      anagrafica,
      httpOptions);
  }
}
