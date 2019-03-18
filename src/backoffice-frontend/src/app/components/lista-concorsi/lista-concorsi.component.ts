import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';
import {Router} from '@angular/router';
import {AppService} from '../../services/app.service';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-lista-concorsi',
  templateUrl: './lista-concorsi.component.html',
  styleUrls: ['./lista-concorsi.component.css']
})
export class ListaConcorsiComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'nome', 'edit'];
  exampleDatabase: ExampleHttpDao | null;
  data: PayloadEntity[] = [];

  selection = new SelectionModel(true, []);

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private router: Router, private appService: AppService) {}

  goToConcorso(id) {
    this.router.navigate(['/concorso', id]);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.data.forEach(row => this.selection.select(row));
  }

  ngOnInit() {

    this.appService.setTitle('LISTA CONCORSI');

    this.exampleDatabase = new ExampleHttpDao(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase.getConcorsi();
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
//          this.resultsLength = data.total_count;
          this.resultsLength = data.payload.length;

          return data.payload;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // TODO: Implement custom errors
          // Catch error
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
}

export interface ConcorsiInterface {
  payload?: (PayloadEntity)[] | null;
}

export interface PayloadEntity {
  id: number;
  nome: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
  constructor(private http: HttpClient) {}

  getConcorsi(): Observable<ConcorsiInterface> {
    const href = 'http://172.16.26.72:9000/api/courses';

    return this.http.get<ConcorsiInterface>(href);
  }
}
