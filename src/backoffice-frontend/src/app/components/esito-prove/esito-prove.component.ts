import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {NotFoundError} from '../../../common/not-found-error';
import {AppError} from '../../../common/app-error';
import {DomandaService} from '../../services/dac/domanda.service';
import {AppService} from '../../services/app.service';


@Component({
  selector: 'app-esito-prove',
  templateUrl: './esito-prove.component.html',
  styleUrls: ['./esito-prove.component.css']
})
export class EsitoProveComponent implements OnInit {

  displayedColumns: string[] = ['data', 'tipo', 'sessione', 'esito', 'punteggio', 'allegati'];
  colonne: string[] = ['testo', 'dati'];

  dataSource;
  dataCandidato;

  idConcorso: string;
  idDomanda: string;

  row = [
    ['CODICE FISCALE', ''],
    ['COGNOME', ''],
    ['NOME', '']
  ];

  esito = [
    ['DATA PROVA'],
    ['TIPO PROVA'],
    ['SESSIONE'],
    ['ESITO PROVA'],
    ['PUNTEGGIO'],
    ['ALLEGATI'],
  ];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private domanda: DomandaService,
    private appService: AppService
  ) {

  }

  ngOnInit(): void {

    this.appService.setTitle('ESITO PROVE');

    this.idConcorso = this.route.snapshot.paramMap.get('idConcorso');
    this.idDomanda = this.route.snapshot.paramMap.get('idDomanda');

    this.domanda.setDomanda(this.idConcorso, this.idDomanda);

    console.log(this.idConcorso, this.idDomanda);

    const hrefDomanda = `http://172.16.26.72:9000/api/domanda/${this.idConcorso}/${this.idDomanda}`;

    this.http.get(hrefDomanda).pipe(
      map((domanda) => {
        return domanda;
      }),
      catchError((error) => {
        if (error.status === 404) {
          return throwError(new NotFoundError(error));
        }
        return throwError(new AppError(error));
      })
    ).subscribe(
      (value: any) => {

        console.log(value);

        this.row[0][1] = value.spid.codiceFiscale;
        this.row[1][1] = value.spid.cognome;
        this.row[2][1] = value.spid.nome;

        this.dataCandidato = this.row;

      }
    );

    const hrefEsito = `http://172.16.26.72:9000/api/domanda/${this.idConcorso}/${this.idDomanda}/esito`;

    this.http.get(hrefEsito).pipe(
      map((esito) => {
        return esito;
      }),
      catchError((error) => {
        if (error.status === 404) {
          return throwError(new NotFoundError(error));
        }
        return throwError(new AppError(error));
      })
    ).subscribe(
      (value: any) => {
        console.log(value);

        this.dataSource =  value.prove.map( x => x);

        console.log('-->', this.dataSource);
      }
    );


  }


}





