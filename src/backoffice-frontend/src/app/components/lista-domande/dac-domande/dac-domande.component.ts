import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge} from 'rxjs';
import {fromEvent} from 'rxjs';
import {Course} from '../../../services/dac/provisor_data_model/course';
import {LessonsDataSource} from '../../../services/dac/lessons.datasource';
import {CoursesService} from '../../../services/dac/courses.service';
import {SelectionModel} from '@angular/cdk/collections';
import {DialogAnnullaDomandaComponent} from './dialog-annulla-domanda/dialog-annulla-domanda.component';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../../../services/app.service';


@Component({
  selector: 'app-dac-domande',
  templateUrl: './dac-domande.component.html',
  styleUrls: ['./dac-domande.component.css']
})
export class DacDomandeComponent implements OnInit, AfterViewInit {


  filter = false;
  course: Course;
  dataSource: LessonsDataSource;
  displayedColumns = ['select', 'id', 'spid.nome', 'spid.codiceFiscale', 'stato', 'data-domanda', 'edit', 'infoEdit'];
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private coursesService: CoursesService,
              private router: Router,
              private appService: AppService) {
  }

  ngOnInit() {

    this.appService.setTitle('LISTA DOMANDE DAC');


    this.course = this.route.snapshot.data['course'];
    this.dataSource = new LessonsDataSource(this.coursesService);
    this.dataSource.loadLessons(this.course.id, '', 'asc', 0, 10);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadLessonsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();

  }

  loadLessonsPage() {
    this.dataSource.loadLessons(
      this.course.id,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }


  selectRow(lesson: any) {
    this.router.navigate(['domanda-dac/', lesson.id]);
  }

  selectState(lesson: any) {
    console.log('Modifica stato della domanda con id numero', lesson.id);
    const href = 'http://localhost:9000/api/lesson?courseId=1&filter=1';
    this.http.get('http://localhost:9000/api/lesson?courseId=1&filter=1').subscribe(
      (value => {
        console.log(value);
        this.http.put('http://localhost:9000/api/domanda/1/1', value).subscribe(
          () => {
            console.log('ok');
          }
        );
      })
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.getLessonArray().value.length;
    console.log(this.dataSource.getLessonArray().value.length);
    return numSelected === numRows;

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.getLessonArray().value.forEach(row => this.selection.select(row));
    console.log(this.dataSource.getLessonArray().value);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleConcorsiInviati() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.getLessonArray().value
        .forEach(row => this.selection.select(row));
  }


  assignStateDomanda(lesson) {
    if (lesson.statoDomanda === 'Sospesa') {
      return 'Sospesa';
    }
    return 0;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAnnullaDomandaComponent, {
      width: '350px',
      data: {domanda: 'ciao'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  startTogglie() {
    if (this.selection.hasValue()) {
      return true;
    }
    console.log(this.selection.hasValue());
    return false;
  }

  lemmeSe(sd) {
    console.log(sd);
  }


  showFilter() {
    this.filter = !this.filter;
  }

}
