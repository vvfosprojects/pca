import { Injectable } from '@angular/core';
import { Observable, of as observableOf, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';

import { ApplicationDetail } from '../models/application-detail.model';
import { ApplicationRow } from '../models/application-row.model';
import { ApplicationRowPage } from '../models/application-row-page.model';
import { ApplicationDetailComponent } from '../application-detail/application-detail.component';

/* const fakeRows: ApplicationRow[] = [
  new ApplicationRow("id1", "Mario Rossi", "XXXYYY55T66R222A", new Date("2010-01-01T20:13:51.4804382+02:00"), false),
  new ApplicationRow("id2", "Giuseppina Bianchi", "XXXYYY55T66R222B", new Date("2010-01-02T23:25:29.2215342+02:00"), false),
  new ApplicationRow("id3", "Alviero Martelli", "XXXYYY55T66R222C", new Date("2010-10-03T17:49:53.2660078+02:00"), true),
  new ApplicationRow("id4", "Wladimiro Giannini", "XXXYYY55T66R222D", new Date("2010-01-04T14:14:59.9389079+02:00"), false),
  new ApplicationRow("id5", "Giuseppe Coretti", "XXXYYY55T66R222E", new Date("2010-01-05T03:41:42.4870141+02:00"), false),
  new ApplicationRow("id6", "Michela Branduardi", "XXXYYY55T66R222F", new Date("2010-01-06T13:45:14.8861873+02:00"), true),
  new ApplicationRow("id7", "Anacleto Rocchetti", "XXXYYY55T66R222G", new Date("2010-01-07T12:38:49.1566073+02:00"), true),
  new ApplicationRow("id8", "Dario Pane", "XXXYYY55T66R222H", new Date("2010-01-08T02:57:16.4665853+02:00"), false),
  new ApplicationRow("id9", "Giacomo Mizzetti", "XXXYYY55T66R222I", new Date("2010-01-09T04:26:11.5248761+02:00"), false),
  new ApplicationRow("id10", "Simone Pianti", "XXXYYY55T66R222J", new Date("2010-01-10T02:04:26.3450102+02:00"), false),
  new ApplicationRow("id11", "Simonetta Tronca", "XXXYYY55T66R222K", new Date("2010-01-11T07:21:20.2809933+02:00"), false),
  new ApplicationRow("id12", "Antonietta Dalila", "XXXYYY55T66R222L", new Date("2010-01-12T13:54:14.4714227+02:00"), false),
  new ApplicationRow("id13", "Tiziana Dante", "XXXYYY55T66R222M", new Date("2010-01-13T14:06:42.1824294+02:00"), false),
  new ApplicationRow("id14", "Ignazio Sola", "XXXYYY55T66R222N", new Date("2010-01-14T16:50:19.4755534+02:00"), false),
]; 

@Injectable({
  providedIn: 'root'
})
export class GetApplicationRowsServiceFake {
*/
@Injectable()
export class GetApplicationRowsServiceFake {
  private fakeRows: ApplicationRow[] = [
    new ApplicationRow("id1", "Mario Rossi", "XXXYYY55T66R222A", new Date("2010-01-01T20:13:51.4804382+02:00"), false),
    new ApplicationRow("id2", "Giuseppina Bianchi", "XXXYYY55T66R222B", new Date("2010-01-02T23:25:29.2215342+02:00"), false),
    new ApplicationRow("id3", "Alviero Martelli", "XXXYYY55T66R222C", new Date("2010-10-03T17:49:53.2660078+02:00"), true),
    new ApplicationRow("id4", "Wladimiro Giannini", "XXXYYY55T66R222D", new Date("2010-01-04T14:14:59.9389079+02:00"), false),
    new ApplicationRow("id5", "Giuseppe Coretti", "XXXYYY55T66R222E", new Date("2010-01-05T03:41:42.4870141+02:00"), false),
    new ApplicationRow("id6", "Michela Branduardi", "XXXYYY55T66R222F", new Date("2010-01-06T13:45:14.8861873+02:00"), true),
    new ApplicationRow("id7", "Anacleto Rocchetti", "XXXYYY55T66R222G", new Date("2010-01-07T12:38:49.1566073+02:00"), true),
    new ApplicationRow("id8", "Dario Pane", "XXXYYY55T66R222H", new Date("2010-01-08T02:57:16.4665853+02:00"), false),
    new ApplicationRow("id9", "Giacomo Mizzetti", "XXXYYY55T66R222I", new Date("2010-01-09T04:26:11.5248761+02:00"), false),
    new ApplicationRow("id10", "Simone Pianti", "XXXYYY55T66R222J", new Date("2010-01-10T02:04:26.3450102+02:00"), false),
    new ApplicationRow("id11", "Simonetta Tronca", "XXXYYY55T66R222K", new Date("2010-01-11T07:21:20.2809933+02:00"), false),
    new ApplicationRow("id12", "Antonietta Dalila", "XXXYYY55T66R222L", new Date("2010-01-12T13:54:14.4714227+02:00"), false),
    new ApplicationRow("id13", "Tiziana Dante", "XXXYYY55T66R222M", new Date("2010-01-13T14:06:42.1824294+02:00"), false),
    new ApplicationRow("id14", "Ignazio Sola", "XXXYYY55T66R222N", new Date("2010-01-14T16:50:19.4755534+02:00"), false),
    new ApplicationRow('id15', "Sola Luigi", "XRRYYY55T66R222N", new Date("2010-01-13T14:06:42.1824294+02:00"), false),
    new ApplicationRow('id16', "Ignazio Due", "XXXYPP55T66R222N", new Date("2010-01-13T14:06:42.1824294+02:00"), false),
    new ApplicationRow('id17', "Ignazio Tre", "XXXYYY55T66R232N", new Date("2010-01-13T14:06:42.1824294+02:00"), false)  
  ];
  private newPageObservable: BehaviorSubject<ApplicationRowPage> = new BehaviorSubject(null);
  private searchKey: string = "";
  private curPage: number = 1;
  private pageSize: number = 5;
  
  constructor() { 
    this.triggerSearch();
  }

  public setSearchKey(searchKey: string): void {
    this.searchKey = searchKey;
    this.triggerSearch();
  }

  public setPageInfo(curPage: number, pageSize: number) {
    this.curPage = curPage;
    this.pageSize = pageSize;
    this.triggerSearch();
  }

  public get newPage(): Observable<ApplicationRowPage> {
    return this.newPageObservable;
  }

  private triggerSearch(): void {
    let startIndex = (this.curPage - 1) * this.pageSize;
    let page = this.fakeRows;
    let filteredCount: number;

    if (!!this.searchKey) {
      page = page.filter(row => row.fullName.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0);
    }
    filteredCount = page.length;

    page = page.filter((row, idx) => idx >= startIndex && idx < startIndex + this.pageSize);

    let result = new ApplicationRowPage(
      startIndex,
      this.pageSize,
      this.fakeRows.length,
      filteredCount,
      page
    );
    this.newPageObservable.next(result);
  }

  public getPageInfo(): number[] {
    return [ this.curPage, this.pageSize ];
  }

  public getSearchKey(): string {
    return this.searchKey;
  }

}
