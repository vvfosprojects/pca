import { ApplicationRow } from "./application-row.model";
// import { EventEmitter } from "protractor";
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetApplicationRowsService } from '../services/get-application-rows.service';

export class ApplicationRowPage {
    constructor(
        public startIdx: number,
        public howMany: number,
        public totalCount: number,
        public totalFiltered: number,
        public rows: ApplicationRow[]
    ) {}
}

export class SearchService {
    constructor(
        public page: number,
        public pageSize: number,
        public searchKey: string,
        public newPage: EventEmitter<ApplicationRowPage> = new EventEmitter(),   // BehavioralSubject
        private getApplicationRowsService: GetApplicationRowsService
    ) {}

    // richiamo nuova pagina dalla table: application-table
    public setPageInfo(page: number, pageSize: number) {
        this.page = page;
        this.pageSize = pageSize;
        console.log("sono qui");
        this.callServiceRows(this.page, this.pageSize);
    }
    
    // richiamo nuove application con il testo di ricerca dal componente navbar
    public setSearchKey(searchKey: string) {
        this.searchKey = searchKey;
            
        this.callServiceRows(this.page, this.pageSize);
    }
    
    public callServiceRows(page: number, pageSize: number) {
        
         this.getApplicationRowsService.getRows(page, pageSize, this.searchKey)
         .subscribe(page => { this.newPage.emit(page);}); 
    } 
    // chiamato dalla table per sottoscriversi agli aggiornamenti delle righe
    public onNewPage() /*: EvenEmitter<ApplicationRowPage>*/ {
    return this.newPage;
    }  
}