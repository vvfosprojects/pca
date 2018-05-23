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
  
  constructor(private getApplicationRowsService: GetApplicationRowsService) { }

  ngOnInit() {
    this.getApplicationRowsService.getRows(this.curPage * this.pageSize, this.pageSize)
      .subscribe(page => this.page = page);
  }

}
