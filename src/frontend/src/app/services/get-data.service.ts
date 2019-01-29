import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {NotFoundError} from '../common/not-found-error';
import {AppError} from '../common/app-error';

@Injectable({
  providedIn: 'root'
})

// Url are defined are defined in proxy.config.json

export class GetDataService {

  private apiDatav1 = 'http://webpc.dipvvf.it:5000/api';  // Province e comuni
  private apiDatav2 = 'http://webpc.dipvvf.it:5001';      // Titoli Riserve Lingue
  private apiDomanda = 'http://webpc.dipvvf.it:5002';     // Api della domanda

  constructor(private http: HttpClient) {
  }

  getTitoliPreferenziali() {
    return this.http.get(this.apiDatav2 + '/TitoliPreferenziali/Tutti')
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return throwError(new NotFoundError(error));
          }
          return throwError(new AppError(error));
        })
      );
  }

  getLingueStraniere() {
    return this.http.get(this.apiDatav2 + '/lingue')
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return throwError(new NotFoundError(error));
          }
          return throwError(new AppError(error));
        })
      );
  }

  getRiserve() {
    return this.http.get(this.apiDatav2 + '/riserve/iac')
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return throwError(new NotFoundError(error));
          }
          return throwError(new AppError(error));
        })
      );
  }

  getSpid() {
    return this.http.get('http://localhost:3000/spid')
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return throwError(new NotFoundError(error));
          }
          return throwError(new AppError(error));
        })
      );
  }

  getProvince() {
    return this.http.get(this.apiDatav1 + '/province')
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return throwError(new NotFoundError(error));
          }
          return throwError(new AppError(error));
        })
      );
  }

  getComuni(provincia: string) {
    return this.http.get(this.apiDatav1 + '/comuni/prov/' + provincia)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return throwError(new NotFoundError(error));
          }
          return throwError(new AppError(error));
        })
      );
  }

  getDomanda() {
    return this.http.get('http://localhost:3000/domanda')
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return throwError(new NotFoundError(error));
          }
          return throwError(new AppError(error));
        })
      );
  }

}

