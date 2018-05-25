
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Anagrafica } from '../app/model/anagrafica.model';

import { CfCheckOutcome } from '../app/model/cf-check-outcome.model';
import { CfCheckResult } from '../app/model/cf-check-result.model';


@Injectable()
export class CfCheckServiceSuccess_Fake {
  private outcome = new CfCheckOutcome(
    [
      new CfCheckResult("succ1", "1 + 1 equals 2.", "Success"),
      new CfCheckResult("succ2", "You are awesome!", "Success")
    ],
    true,
    true
  );

  constructor() { }

  public cfCheck(anagrafica: Anagrafica): Observable<CfCheckOutcome> {
    console.log("CfCheckServiceSuccess fake service called");
    return observableOf(this.outcome);
  }
}
