import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetApplicationRowsService } from '../services/get-application-rows.service';
import { ApplicationRow } from '../models/application-row.model';
import { ApplicationRowPage } from '../models/application-row-page.model';


import { Router} from "@angular/router";

@Component({
  selector: 'app-application-table',
  templateUrl: './application-table.component.html',
  styleUrls: ['./application-table.component.css']
})
export class ApplicationTableComponent implements OnInit {
  private curPage: number;
  private pageSize: number;
  private page: ApplicationRowPage = null;
  
  constructor(private getRows: GetApplicationRowsService,
    private router: Router) { }

  ngOnInit() {
    let pageInfo = this.getRows.getPageInfo();
    this.curPage = pageInfo[0];
    this.pageSize = pageInfo[1];
    this.getRows.newPage.subscribe(page => {
      this.page = page;
    });
      
 }


  private loadPage(pageCorrente: number) {
    this.curPage = pageCorrente;
    this.getRows.setPageInfo(this.curPage, this.pageSize);
      
  }

  private mostraApplication(row: ApplicationRow) {
    this.router.navigate(['/application-detail', row.id]);
  }

}



