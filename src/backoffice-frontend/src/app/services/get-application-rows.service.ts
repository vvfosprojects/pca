import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { ApplicationRowPage } from '../models/application-row-page.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const APIURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class GetApplicationRowsService {
  private newPageObservable: BehaviorSubject<ApplicationRowPage> = new BehaviorSubject(null);
  private curPage: number = 1;
  private pageSize: number = 5;
  private searchKey: string = "";

  constructor(private http: HttpClient) {
    this.triggerSearch();
  }

  public setSearchKey(searchKey: string): void {
    this.searchKey = searchKey.trim();
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

  public getPageInfo(): number[] {
    return [this.curPage, this.pageSize];
  }

  private triggerSearch(): void {
    let action = "/application";
    let startIndex = (this.curPage - 1) * this.pageSize;

    let params = new HttpParams()
      .set('startIndex', startIndex.toString())
      .set('howMany', this.pageSize.toString())
      .set('searchKey', this.searchKey.toString());

    this.http.get<ApplicationRowPage>(APIURL + action, { params: params })
      .pipe(
        debounceTime(2000),
        distinctUntilChanged()
      )
      .subscribe(row => {
        console.log("richiesta http");
        this.newPageObservable.next(row);
      });
  }

}
