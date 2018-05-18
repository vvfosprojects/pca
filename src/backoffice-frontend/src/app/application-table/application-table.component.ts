import { Component, OnInit } from '@angular/core';
import { GetApplicationRowsService } from '../services/get-application-rows.service';
import { ApplicationRow } from '../models/application-row.model';

@Component({
  selector: 'app-application-table',
  templateUrl: './application-table.component.html',
  styleUrls: ['./application-table.component.css']
})
export class ApplicationTableComponent implements OnInit {
  private page: number;
  private pageSize: number;

  private rows: ApplicationRow[];
  
  constructor(private getApplicationRowsService: GetApplicationRowsService) { }

  ngOnInit() {
    this.page = 0;
    this.pageSize = 5;

    this.getApplicationRowsService.getRows(this.page * this.pageSize, this.pageSize)
      .subscribe(rows => this.rows = rows);
  }

}
