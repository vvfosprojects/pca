import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Anagrafica } from '../app/model/anagrafica.model';
import { CfCheckOutcome } from '../app/model/cf-check-outcome.model';
import { Observable } from 'rxjs';
import { Domanda } from '../app/model/domanda.model';
import { DomandaResult } from '../app/model/domanda-result.model';

const BACKENDURL = environment.backendUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class ApplicationService {
  private cfCheckUrl = '/application';

  constructor(private http: HttpClient) { }

  inserisci(domanda: Domanda): Observable<DomandaResult> {
    return this.http.post<DomandaResult>(
      BACKENDURL + this.cfCheckUrl,
      domanda,
      httpOptions);
  }
}
