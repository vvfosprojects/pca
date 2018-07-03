import { Component, OnInit } from '@angular/core';
import { GetApplicationRowsService } from '../services/get-application-rows.service';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  constructor(private getRows: GetApplicationRowsService) { }

  ngOnInit() {
  }

  private textChanged(searchKey: string) {
    this.getRows.setSearchKey(searchKey);
  }

}
