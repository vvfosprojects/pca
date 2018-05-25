import { Component, OnInit } from '@angular/core';
import { GetApplicationRowsService } from '../services/get-application-rows.service';
import { ApplicationRow } from '../models/application-row.model';
import { ApplicationRowPage } from '../models/application-row-page.model';


@Component({
  selector: 'app-application-table',
  templateUrl: './application-table.component.html',
  styleUrls: ['./application-table.component.css']
})
export class ApplicationTableComponent implements OnInit {
  private curPage: number = 0;
  private pageSize: number = 5;
   

  private page: ApplicationRowPage;
  
  private lastPage : boolean = false;
  private firstPage : boolean = true;
  
  constructor(private getApplicationRowsService: GetApplicationRowsService) { }

  ngOnInit() {
    this.getApplicationRowsService.getRows(this.curPage * this.pageSize, this.pageSize)
      .subscribe(page => this.page = page);
  }


  onNext() {
    this.curPage = this.curPage+this.pageSize;
    this.getApplicationRowsService.getRows(this.curPage, this.pageSize)
    .subscribe(page => this.page = page);
    if (this.curPage+this.pageSize > this.page.totalCount) 
       this.lastPage = true;
       this.firstPage = false;
       }

  onPrev() {
    this.curPage = this.curPage-this.pageSize;
    this.getApplicationRowsService.getRows(this.curPage, this.pageSize)
    .subscribe(page => this.page = page);
    if (this.curPage <= 0) 
       this.firstPage = true;
       this.lastPage = false;
    }
  }

