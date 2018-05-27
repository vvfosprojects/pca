
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Anagrafica } from '../app/model/anagrafica.model';

import { CfCheckOutcome } from '../app/model/cf-check-outcome.model';
import { Domanda } from '../app/model/domanda.model';
import { DomandaResult } from '../app/model/domanda-result.model';


@Injectable()
export class ApplicationService_Fake {
  constructor() { }

  public inserisciDomanda(d: Domanda): Observable<DomandaResult> {
    let result: DomandaResult = new DomandaResult(
      d.fiscalCode,
      "ABC424",
      [
        "Your submission has been successfully saved",
        "You can update your submission using the returned PIN",
        "Don't forget to check the official website periodically"
      ],
      new Date());

    return observableOf(result);
  }
}
