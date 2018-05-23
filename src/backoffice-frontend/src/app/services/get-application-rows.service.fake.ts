import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

import { ApplicationRow } from '../models/application-row.model';
import { ApplicationRowPage } from '../models/application-row-page.model';

const fakeRows: ApplicationRow[] = [
  new ApplicationRow("id1", "Mario Rossi", "XXXYYY55T66R222A", new Date("2010-01-01"), false),
  new ApplicationRow("id2", "Giuseppina Bianchi", "XXXYYY55T66R222B", new Date("2010-01-02"), false),
  new ApplicationRow("id3", "Alviero Martelli", "XXXYYY55T66R222C", new Date("2010-01-03"), true),
  new ApplicationRow("id4", "Wladimiro Giannini", "XXXYYY55T66R222D", new Date("2010-01-04"), false),
  new ApplicationRow("id5", "Giuseppe Coretti", "XXXYYY55T66R222E", new Date("2010-01-05"), false),
  new ApplicationRow("id6", "Michela Branduardi", "XXXYYY55T66R222F", new Date("2010-01-06"), true),
  new ApplicationRow("id7", "Anacleto Rocchetti", "XXXYYY55T66R222G", new Date("2010-01-07"), true),
  new ApplicationRow("id8", "Dario Pane", "XXXYYY55T66R222H", new Date("2010-01-08"), false),
  new ApplicationRow("id9", "Giacomo Mizzetti", "XXXYYY55T66R222I", new Date("2010-01-09"), false),
  new ApplicationRow("id10", "Simone Pianti", "XXXYYY55T66R222J", new Date("2010-01-10"), false),
  new ApplicationRow("id11", "Simonetta Tronca", "XXXYYY55T66R222K", new Date("2010-01-11"), false),
  new ApplicationRow("id12", "Antonietta Dalila", "XXXYYY55T66R222L", new Date("2010-01-12"), false),
  new ApplicationRow("id13", "Tiziana Dante", "XXXYYY55T66R222M", new Date("2010-01-13"), false),
  new ApplicationRow("id14", "Ignazio Sola", "XXXYYY55T66R222N", new Date("2010-01-14"), false),
];

@Injectable({
  providedIn: 'root'
})
export class GetApplicationRowsServiceFake {

  constructor() { }

  public getRows(startIndex: number, howMany: number): Observable<ApplicationRowPage> {
    let page = fakeRows.filter((row, idx) => idx >= startIndex && idx < startIndex + howMany);
    let result = new ApplicationRowPage(
      startIndex,
      howMany,
      fakeRows.length,
      page
    );
    return observableOf(result);
  }
}
