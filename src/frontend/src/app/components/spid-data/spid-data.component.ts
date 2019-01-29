import {Component, OnInit} from '@angular/core';
import {GetDataService} from '../../services/get-data.service';
import {AppError} from '../../common/app-error';
import {NotFoundError} from '../../common/not-found-error';
import {Spid} from '../../model/spid';
@Component({
  selector: 'app-spid-data',
  templateUrl: './spid-data.component.html',
  styleUrls: ['./spid-data.component.css']
})
export class SpidDataComponent implements OnInit {

  // Da rendere subscribe
  spidData: Spid = {} as any;

  constructor(private get: GetDataService) {
  }

  async ngOnInit() {
    this.get.getSpid().subscribe((value: Spid) => {
        this.spidData = value;
        console.log(this.spidData);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          console.log('Error richiesta http');
        } else {
          console.log(error);
        }
      });
  }
}
