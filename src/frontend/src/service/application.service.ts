import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Anagrafica } from '../app/model/anagrafica.model';
import { CfCheckOutcome } from '../app/model/cf-check-outcome.model';
import { Domanda } from '../app/model/domanda.model';
import { DomandaOutcome } from '../app/model/domanda-outcome.model';
import { DomandaResult } from '../app/model/domanda-result.model';

import { catchError, map } from 'rxjs/operators';
import { of as observableOf, Observable, throwError } from 'rxjs';

const BACKENDURL = environment.backendUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private applicationUrl = '/application';
  private lastResponse: DomandaOutcome;

  constructor(private http: HttpClient) { }

  public inserisciDomanda(domanda: Domanda): Observable<DomandaOutcome> {
    return this.http.post<DomandaOutcome>(BACKENDURL + this.applicationUrl, domanda, httpOptions)
      .pipe(map(result => {
        this.lastResponse = result;
        return result;
      }))
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  public getLastResponse(): DomandaOutcome {
    return this.lastResponse;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return observableOf(new DomandaOutcome(
      "",
      "",
      [
        new DomandaResult("NetError", "Si è verificato un errore nel contattare il server. Riprovare più tardi.", "Error")
      ],
      //new Date(),
      null,
      false
    ));
  }
};