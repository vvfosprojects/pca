import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { ApplicationRowPage } from '../models/application-row-page.model';

const APIURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class GetApplicationRowsService {
  private newPageObservable: Subject<ApplicationRowPage> = new Subject();
  private curPage: number = 1;
  private pageSize: number = 5;

  constructor(private http: HttpClient) { }

  public getRows(startIndex: number, howMany: number, searchKey: string): Observable<ApplicationRowPage> {
    let action = "/application";

    let params = new HttpParams()
      .set('startIndex', startIndex.toString())
      .set('howMany', howMany.toString())
      .set('searchKey', howMany.toString());

    return this.http.get<ApplicationRowPage>(APIURL + action, { params: params });
  }

  public setSearchKey(searchKey: string): void {
    console.log("searchKey:", searchKey);
  }

  public setPageInfo(curPage: number, pageSize: number) {
    console.log("page info", curPage, pageSize);
  }

  public get newPage(): Observable<ApplicationRowPage> {
    return this.newPageObservable;
  }

  public getPageInfo(): number[] {
    return [this.curPage, this.pageSize];
  }

}
