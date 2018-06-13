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


  private itemCorrenti: number = 0;
  private pageSize: number = 5;

  private page: ApplicationRowPage = null;

  private pageCorrente: any = 1;

 constructor(private router: Router, private getApplicationRowsService: GetApplicationRowsService) { }

  ngOnInit() {
   
    this.getApplicationRowsService.getRows(0, this.pageSize)
      .subscribe(page => { this.page = page;});
      
  }


  private loadPage(pageCorrente : number) {

    this.itemCorrenti = (this.page.howMany*pageCorrente) - this.page.howMany;
    
    this.getApplicationRowsService.getRows(this.itemCorrenti, this.pageSize)
    .subscribe(page => this.page = page);
    
  }

      
  private mostraApplication(row: ApplicationRow) {
    console.log(row);
    this.router.navigate(['/application-detail', row.id]);
  }

}



