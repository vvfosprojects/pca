
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Anagrafica } from '../app/model/anagrafica.model';

import { CfCheckOutcome } from '../app/model/cf-check-outcome.model';
import { Domanda } from '../app/model/domanda.model';
import { DomandaOutcome } from '../app/model/domanda-outcome.model';
import { DomandaResult } from '../app/model/domanda-result.model';



@Injectable()
export class ApplicationServiceSuccess_Fake {
  private result: DomandaOutcome = new DomandaOutcome(
    "XXXYYY99T99R999X",
    "ABC424",
    [
      new DomandaResult("succ1", "Your submission has been successfully saved", "Success"),
      new DomandaResult("succ2", "You can update your submission using the returned PIN", "Success"),
      new DomandaResult("succ3", "Don't forget to check the official website periodically", "Success")
    ],
    null,
    true);
  constructor() { }

  public inserisciDomanda(d: Domanda): Observable<DomandaOutcome> {
    return observableOf(this.result);
  }

  public getLastResponse(): DomandaOutcome {
    return this.result;
  }
}
