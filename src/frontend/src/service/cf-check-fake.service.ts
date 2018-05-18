
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Anagrafica } from '../app/model/anagrafica.model';

import { CfCheckOutcome } from '../app/model/cf-check-outcome.model';


@Injectable()
export class CfCheckService_Fake {
  private anag: Anagrafica =
    new Anagrafica(
      "SPSMCL73T16L259D",
      "Marcello",
      "Esposito",
      new Date("1973-12-16"),
      "12345"
    );

  constructor() { }

  public cfCheck(): Observable<Anagrafica> {
    return observableOf(this.anag);
  }
}
