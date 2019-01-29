import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {NotFoundError} from '../common/not-found-error';
import {AppError} from '../common/app-error';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }),
};


@Injectable({
  providedIn: 'root'
})

export class PutDataService {

  private url = 'http://localhost:3000';
  private urlTest = 'http://webpc.dipvvf.it:5002/api/concorsoiac/xxxxxxxxxxxxxxxx';



  constructor(private http: HttpClient) {
  }

  putDomanda(domanda) {
    return this.http.put('http://localhost:3000/domanda', domanda)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return throwError(new NotFoundError(error));
          }
          return throwError(new AppError(error));
        })
      );
  }

  putTest(test) {
    return this.http.put('http://webpc.dipvvf.it:5002/api/concorsoiac', test )
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
