import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

import { ApplicationRow } from '../models/application-row.model';

@Injectable({
  providedIn: 'root'
})
export class GetApplicationRowsServiceFake {

  constructor() {}

  public getRows(startIndex: number, howMany: number): Observable<ApplicationRow[]> {
    return observableOf([
      new ApplicationRow("id1", "Cognome1 Nome1", "XXXYYY55T66R222A", new Date("2010-01-01"), false),
      new ApplicationRow("id2", "Cognome2 Nome2", "XXXYYY55T66R222B", new Date("2010-01-02"), false),
      new ApplicationRow("id3", "Cognome3 Nome3", "XXXYYY55T66R222C", new Date("2010-01-03"), true),
      new ApplicationRow("id4", "Cognome4 Nome4", "XXXYYY55T66R222D", new Date("2010-01-04"), false),
      new ApplicationRow("id5", "Cognome5 Nome5", "XXXYYY55T66R222E", new Date("2010-01-05"), false),
      new ApplicationRow("id6", "Cognome6 Nome6", "XXXYYY55T66R222F", new Date("2010-01-06"), false),
      new ApplicationRow("id7", "Cognome7 Nome7", "XXXYYY55T66R222G", new Date("2010-01-07"), true),
      new ApplicationRow("id8", "Cognome8 Nome8", "XXXYYY55T66R222H", new Date("2010-01-08"), false),
      new ApplicationRow("id9", "Cognome9 Nome9", "XXXYYY55T66R222I", new Date("2010-01-09"), false),
      new ApplicationRow("id10", "Cognome10 Nome10", "XXXYYY55T66R222J", new Date("2010-01-10"), false),
      new ApplicationRow("id11", "Cognome11 Nome11", "XXXYYY55T66R222K", new Date("2010-01-11"), false),
      new ApplicationRow("id12", "Cognome12 Nome12", "XXXYYY55T66R222L", new Date("2010-01-12"), false),
      new ApplicationRow("id13", "Cognome13 Nome13", "XXXYYY55T66R222M", new Date("2010-01-13"), false),
      new ApplicationRow("id14", "Cognome14 Nome14", "XXXYYY55T66R222N", new Date("2010-01-14"), false),
    ].filter((row, idx) => idx >= startIndex && idx <= startIndex + howMany));
  }
}
