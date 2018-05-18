
import {of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Anagrafica } from '../app/model/anagrafica.model';

import { CfCheckOutcome } from '../app/model/cf-check-outcome.model';
import { Domanda } from '../app/model/domanda.model';
import { DomandaResult } from '../app/model/domanda-result.model';


@Injectable()
export class ApplicationService_Fake {
  private domanda: Domanda =
     new Domanda(
      "MRZMNL79E68H501Z",
      "Manuela",
      "Marzotti",
      "1979-05-28T00:00:00.000Z",
      "manuela.marzotti@pippo.it",
      "+393331234567",
      ["DIR-LAZ", "COM-RM"], 
      101,
     "C class - issued on 10/11/2010 - valid until 10/11/2020",
      null
     );

     private domandaResult: DomandaResult =
     new DomandaResult("0", "inserimento effettuato con successo");

  constructor() { }

  public checkDomanda(): Observable<Domanda> {
    return observableOf(this.domanda);
  }

  public inserisciDomanda(): Observable<DomandaResult> {
    return observableOf(this.domandaResult);
  }
}
