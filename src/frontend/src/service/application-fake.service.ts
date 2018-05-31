
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Anagrafica } from '../app/model/anagrafica.model';

import { CfCheckOutcome } from '../app/model/cf-check-outcome.model';
import { Domanda } from '../app/model/domanda.model';
import { DomandaOutcome } from '../app/model/domanda-outcome.model';
import { DomandaResult } from '../app/model/domanda-result.model';



@Injectable()
export class ApplicationService_Fake {
  constructor() { }

  public inserisciDomanda(d: Domanda): Observable<DomandaOutcome> {
    let result: DomandaOutcome = new DomandaOutcome(
      d.fiscalCode,
      "ABC424",
      [
        new DomandaResult("err1", "Your submission has not been saved", "Error"),
        new DomandaResult("warn1", "Your submission has been accepted with reserve", "Warning"),
        new DomandaResult("succ3", "You will receive a confirmation email", "Success")
      ],
      //new Date(),
      null,
      false);

    return observableOf(result);
  }
}
