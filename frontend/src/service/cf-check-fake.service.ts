import { Injectable } from '@angular/core';
import { Anagrafica } from '../app/model/anagrafica.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
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
    return Observable.of(this.anag);
  }
}
