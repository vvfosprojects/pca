import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetApplicationRowsService } from '../services/get-application-rows.service';
import { ApplicationRow } from '../models/application-row.model';
import { ApplicationRowPage } from '../models/application-row-page.model';
import { Router } from "@angular/router";


@Component({
  selector: 'app-application-table',
  templateUrl: './application-table.component.html',
  styleUrls: ['./application-table.component.css']
})
export class ApplicationTableComponent implements OnInit {

  @Input() application: ApplicationRow;


  private curPage: number = 0;
  private pageSize: number = 5;

  private page: ApplicationRowPage = null;

  private lastPage: boolean = false;
  private firstPage: boolean = true;

  /*  private numberPage : number = 1;
   private totPage = ['1','2','3'];
  */

  constructor(private router: Router, private getApplicationRowsService: GetApplicationRowsService) { }

  ngOnInit() {
    this.getApplicationRowsService.getRows(this.curPage * this.pageSize, this.pageSize)
      .subscribe(page => {
        this.page = page;
        if ((this.curPage + this.pageSize >= this.page.totalCount) || (this.page.totalCount == 0)) {
          this.lastPage = true;
        }
        else
          this.lastPage = false;
      });
  }


  private onNext() {
    this.curPage = this.curPage + this.pageSize;
    // this.numberPage = this.numberPage + 1;
    this.getApplicationRowsService.getRows(this.curPage, this.pageSize)
      .subscribe(page => this.page = page);
    if ((this.curPage + this.pageSize >= this.page.totalCount) || (this.page.totalCount == 0)) {
      this.lastPage = true;
      this.firstPage = false;
    }
    else
      this.firstPage = false;
  }

  private onPrev() {
    this.curPage = this.curPage - this.pageSize;
    // this.numberPage = this.numberPage - 1;
    this.getApplicationRowsService.getRows(this.curPage, this.pageSize)
      .subscribe(page => this.page = page);
    if (this.curPage <= 0) {
      this.firstPage = true;
      this.lastPage = false;
    }
    else
      this.lastPage = false;
  }

  private mostraApplication(row: ApplicationRow) {
    console.log(row);
    this.router.navigate(['/application-detail', row.id]);
  }

}



