import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetApplicationRowsService } from '../services/get-application-rows.service';
import { ApplicationRow } from '../models/application-row.model';
import { ApplicationRowPage } from '../models/application-row-page.model';

import { ActivatedRoute, Router, ParamMap } from "@angular/router";
@Component({
  selector: 'app-application-table',
  templateUrl: './application-table.component.html',
  styleUrls: ['./application-table.component.css']
})
export class ApplicationTableComponent implements OnInit {
  private pageCorrente: any = 1;
  @Input() application: ApplicationRow;


  private itemCorrenti: number = 0;
  private pageSize: number = 5;
 
 
  private page: ApplicationRowPage = null;

  
  
 constructor(private router: Router, private route: ActivatedRoute, private getApplicationRowsService: GetApplicationRowsService) { }

  ngOnInit() {
       
    this.getApplicationRowsService.getRows(0, this.pageSize)
    .subscribe(page => { this.page = page;}); 

    let pageStorage = window.localStorage.getItem('pageStorage');

    if (pageStorage)  
      {
          this.pageCorrente = pageStorage;
          this.loadPage(this.pageCorrente);
     }      
   } 



  private loadPage(pageCorrente : number) {

    this.itemCorrenti = (this.page.howMany*pageCorrente) - this.page.howMany;

    window.localStorage.setItem('pageStorage', this.pageCorrente);
    
    this.getApplicationRowsService.getRows(this.itemCorrenti, this.pageSize)
    .subscribe(page => this.page = page);
      
  }

  private mostraApplication(row: ApplicationRow) {
    this.router.navigate(['/application-detail', row.id]);
  }
 
}



