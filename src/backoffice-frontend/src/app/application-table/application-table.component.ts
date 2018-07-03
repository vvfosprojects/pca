import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetApplicationRowsService } from '../services/get-application-rows.service';
import { ApplicationRow } from '../models/application-row.model';
import { ApplicationRowPage } from '../models/application-row-page.model';
import { SearchService } from '../models/application-row-page.model';

import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-application-table',
  templateUrl: './application-table.component.html',
  styleUrls: ['./application-table.component.css']
})
export class ApplicationTableComponent implements OnInit {
  private pageCorrente: any = 1;
  @Input() application: ApplicationRow;
  @Input() search: SearchService;
  
  private itemCorrenti: number = 0;
  private pageSize: number = 5;
  
  private searchKey: string;
 
  private page: ApplicationRowPage = null;

  
  
 constructor(private router: Router, private route: ActivatedRoute, private getApplicationRowsService: GetApplicationRowsService
) { }

  ngOnInit() {
               
   /*  let searchChiave = window.localStorage.getItem('searchChiave');

    this.searchKey = searchChiave;
    console.log("app-table",this.searchKey); */

   
 /* this.getApplicationRowsService.getRows(0, this.pageSize, this.searchKey)
    .subscribe(page => { this.page = page;}); 
  */
/*
    let pageStorage = window.localStorage.getItem('pageStorage');

    if (pageStorage)  
      {
          this.pageCorrente = pageStorage;
          this.loadPage(this.pageCorrente);
     }      
*/

      this.search.setPageInfo(this.itemCorrenti, this.pageSize);
    /* this.search.onNewPage(); */
     
   } 

  
  private loadPage(pageCorrente : number) {

    this.itemCorrenti = (this.page.howMany*pageCorrente) - this.page.howMany;

    window.localStorage.setItem('pageStorage', this.pageCorrente);
    
    let searchChiave = window.localStorage.getItem('searchChiave');

    this.searchKey = searchChiave;
    console.log("app-table1",this.searchKey);

    this.getApplicationRowsService.getRows(this.itemCorrenti, this.pageSize, this.searchKey)
    .subscribe(page => this.page = page);
      
  }

  private mostraApplication(row: ApplicationRow) {
    this.router.navigate(['/application-detail', row.id]);
  }
 
}



