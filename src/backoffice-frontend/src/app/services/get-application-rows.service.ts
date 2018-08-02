import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { ApplicationRowPage } from '../models/application-row-page.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const APIURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class GetApplicationRowsService {
  private filterSubject: Subject<SearchData> = new Subject<SearchData>();
  private newPageObservable: BehaviorSubject<ApplicationRowPage> = new BehaviorSubject(null);
  private searchData: SearchData = SearchData.create();

  /**
   * Triggers the first time a search with default values. Then, subscribes the filter observable for future searches.
   * @param http The injected service
   */
  constructor(private http: HttpClient) {
    this._triggerSearch(this.searchData);

    this.filterSubject.pipe(
      debounceTime(250),
      distinctUntilChanged((x, y) => x.Equals(y))
    ).subscribe(searchData => this._triggerSearch(searchData));
  }

  /**
   * Changes searchKey and triggers a new search
   * @param searchKey The new search key
   */
  public setSearchKey(searchKey: string): void {
    this.searchData = new SearchData(this.searchData.curPage, this.searchData.pageSize, searchKey.trim());
    this.triggerSearch();
  }

  /**
   * Changes page data and triggers a new search
   * @param curPage The new current page
   * @param pageSize The new page size
   */
  public setPageInfo(curPage: number, pageSize: number) {
    this.searchData = new SearchData(curPage, pageSize, this.searchData.searchKey);
    this.triggerSearch();
  }

  /**
   * Returns the observable publishing the availability of a new applications page.
   */
  public get newPage(): Observable<ApplicationRowPage> {
    return this.newPageObservable;
  }

  /**
   * Returns currently active page data
   */
  public getPageInfo(): number[] {
    return [ this.searchData.curPage, this.searchData.pageSize ];
  }

  /**
   * Returns currently active search key
   */
  public getSearchKey(): string {
    return this.searchData.searchKey;
  }

  /**
   * This method triggers a new value on the filter observable.
   */
  private triggerSearch(): void {
    this.filterSubject.next(this.searchData);
  }

  /**
   * Actually triggers the http request towards the backend. This method is filtered by the filterSubject observable.
   */
  private _triggerSearch(searchData: SearchData): void {
    let action = "/application";
    let startIndex = (searchData.curPage - 1) * searchData.pageSize;

    let params = new HttpParams()
      .set('startIndex', startIndex.toString())
      .set('howMany', searchData.pageSize.toString())
      .set('searchKey', searchData.searchKey.toString());

    this.http.get<ApplicationRowPage>(APIURL + action, { params: params })
      .subscribe(row => {
        console.log("richiesta http");
        this.newPageObservable.next(row);
      });
  }
}

/**
 * A local class holding the current search data
 */
class SearchData {
  constructor(public readonly curPage: number,
    public readonly pageSize: number,
    public readonly searchKey: string) { }

  /**
   * Performs the equality operator
   * @param other The other instance to be compared
   */
  public Equals(other: SearchData): boolean {
    return this.curPage == other.curPage &&
      this.pageSize == other.pageSize &&
      this.searchKey == other.searchKey;
  }

  public static create() {
    return new SearchData(1, 5, "");
  }
}
