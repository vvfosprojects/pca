import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {NotFoundError} from '../common/not-found-error';
import {AppError} from '../common/app-error';
import {Comuni} from '../model/comuni';
import {Province} from '../model/province';


interface FormDomanda {

  // ISTRUZIONE
  istitutoFrequentato: string;
  annoDiploma: string;
  tipoDiploma: string;
  provinciaIstituto: string;
  comuneIstituto: string;
  viaIstituto: string;

  //  LINGUA
  linguaSelezionata: number;

  // TITOLI PREFERENZIALI

  titoliPreferenziali: string[];
  numeroFigli: string;

  // RISERVE

  riserve: string[];

  // CATEGORIE PROTETTE

  isCategorieProtette: string;

  cateorieProtette: string;
  percentualeInvalidita: string;
  dataCertificazione: string;
  invaliditaEnte: string;
  drtAusili: boolean;
  drtTempiAgiguntivi: boolean;
  drtEsenzione: boolean;


}

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
      .pipe(map(value => value))
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
      .pipe(map(value => value))
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
      .pipe(map(value => value))
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
      .pipe(map(value => value))
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
      .pipe(map((value: Province) => {
        return value.table.map(ogg => ogg);
      }))
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return throwError(new NotFoundError(error));
          }
          return throwError(new AppError(error));
        })
      );
  }

  // Mappo i comuni e li riordino, in modo che durante la ricerca i comuni minori appaiano per primi

  getComuni(provincia: string) {
    return this.http.get(this.apiDatav1 + '/comuni/prov/' + provincia)
      .pipe(map((value: Comuni) => {
        return value.table
          .map(nome => nome.comune)
          .sort((a, b) => {
            return a.length - b.length;
          });
      }))
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
        map((domanda: any) => {
          return domanda;
        }))
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

