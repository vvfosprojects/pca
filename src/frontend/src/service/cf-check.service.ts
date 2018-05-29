import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Anagrafica } from '../app/model/anagrafica.model';
import { CfCheckOutcome } from '../app/model/cf-check-outcome.model';
import { of as observableOf, Observable, throwError } from 'rxjs';
import { analyzeFile } from '@angular/compiler';
import { catchError } from 'rxjs/operators';
import { CfCheckResult } from '../app/model/cf-check-result.model';

const BACKENDURL = environment.backendUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class CfCheckService {
  private cfCheckUrl = '/cfCheck';

  constructor(private http: HttpClient) { }

  public cfCheck(anagrafica: Anagrafica): Observable<CfCheckOutcome> {
    return this.http.post<CfCheckOutcome>(BACKENDURL + this.cfCheckUrl, anagrafica, httpOptions)
      .pipe(
        catchError(error => this.handleError(error))
      );
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
    return observableOf(new CfCheckOutcome([
      new CfCheckResult("NetError", "Si è verificato un errore nel contattare il server. Riprovare più tardi.", "Error")
    ],
      false,
      false));
  };
}
