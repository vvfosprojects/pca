
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Anagrafica } from '../app/model/anagrafica.model';

import { CfCheckOutcome } from '../app/model/cf-check-outcome.model';
import { CfCheckResult } from '../app/model/cf-check-result.model';


@Injectable()
export class CfCheckService_Fake {
  private outcome = new CfCheckOutcome(
    [
      new CfCheckResult("err1", "1 + 1 equals 2. You wrote 3.", "Error"),
      new CfCheckResult("warn1", "Weather is rainy. You should take the umbrella.", "Warning"),
      new CfCheckResult("succ1", "You are awesome!", "Success")
    ],
    false,
    true
  );

  constructor() { }

  public cfCheck(anagrafica: Anagrafica): Observable<CfCheckOutcome> {
    console.log("CfCheckService fake service called");
    return observableOf(this.outcome);
  }
}
