import { Injectable } from '@angular/core';
import {dacApi} from './dac-api';
import {Observable, throwError} from 'rxjs';
import {TitoliPreferenziali} from '../../../model/DAC/data-model/titoli-preferenziali';
import {catchError, map} from 'rxjs/operators';
import {NotFoundError} from '../../../../common/not-found-error';
import {AppError} from '../../../../common/app-error';
import {HttpClient} from '@angular/common/http';
import {LingueStraniere} from '../../../model/DAC/data-model/lingue-straniere';
import {Riserve} from '../../../model/DAC/data-model/riserve';
import {Province} from '../../../model/DAC/data-model/province';
import {Comuni} from '../../../model/DAC/data-model/comuni';
import {Domanda} from '../../../model/DAC/local-model/domanda';

@Injectable({
  providedIn: 'root'
})
export class HttpDacService {

  constructor(private http: HttpClient) {
  }

  // Get section

  getTitoliPreferenziali(): Observable<TitoliPreferenziali[]> {
    return this.http.get<TitoliPreferenziali[]>(dacApi['api-titoli'] + '/TitoliPreferenziali/Tutti')
      .pipe(
        map( (titoliPreferenziali) => {
          return titoliPreferenziali;
        }),
        catchError((error) => {
          if (error.status === 404) {
            return throwError(new NotFoundError(error));
          }
          return throwError(new AppError(error));
        })
      );
  }

  getLingueStraniere(): Observable<LingueStraniere[]> {
    return this.http.get<LingueStraniere[]>(dacApi['api-lingue'] + '/lingue')
      .pipe(
        map( (response) => {
          return response;
        }),
        catchError((error) => {
          if (error.status === 404) {
            return throwError(new NotFoundError(error));
          }
          return throwError(new AppError(error));
        })
      );
  }

  getRiserve(): Observable<Riserve[]> {
    return this.http.get<Riserve[]>(dacApi['api-riserve'] + '/riserve/iac')
      .pipe(
        map( (response: Riserve[]) => {
          return response;
        }),
        catchError((error) => {
          if (error.status === 404) {
            return throwError(new NotFoundError(error));
          }
          return throwError(new AppError(error));
        })
      );
  }

  getProvince(): Observable<Province> {
    return this.http.get<Province>(dacApi['api-province'] + '/province')
      .pipe(
        map( (province) => {
          return province;
        }),
        catchError((error) => {
          if (error.status === 404) {
            return throwError(new NotFoundError(error));
          }
          return throwError(new AppError(error));
        })
      );
  }

  getComuni(provincia: string): Observable<Comuni> {
    return this.http.get<Comuni>( dacApi['api-comuni'] + '/comuni/prov/' + provincia)
      .pipe(
        map( (comuni) => {
          return comuni;
        }),
        catchError((error) => {
          if (error.status === 404) {
            return throwError(new NotFoundError(error));
          }
          return throwError(new AppError(error));
        })
      );
  }

  // TODO: implementare http param
  getDomanda(domandaId): Observable<Domanda> {
    return this.http.get<Domanda>('http://172.16.26.72:9000/api/domanda/1/' + domandaId)
      .pipe(
        map( (domanda) => {
          console.log(domanda);
          return domanda;
        }),
        catchError((error) => {
          if (error.status === 404) {
            return throwError(new NotFoundError(error));
          }
          return throwError(new AppError(error));
        })
      );
  }

  // Put section

  // TODO: inserire l'id
  putDomanda(domanda) {
    return this.http.put(dacApi['api-domanda-dac'], domanda)
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
