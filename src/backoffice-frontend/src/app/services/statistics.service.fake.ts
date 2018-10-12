import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { Statistics } from '../models/statistics.model';

@Injectable()
export class StatisticsServiceFake {

  constructor() { }

  public getStatistics(): Observable<Statistics> {
    return observableOf(new Statistics(
      1245,
      1255,
      1323,
      10,
      18,
      102,
      328
    ));
  }

}
