import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Statistics } from './statistics.model';

import 'rxjs/add/observable/of';

@Injectable()
export class StatisticsServiceFake {

  constructor() { }

  public getStatistics(): Observable<Statistics> {
    return Observable.of(new Statistics(
      1255,
      1323,
      13,
      28,
      102,
      328
    ));
  }

}
