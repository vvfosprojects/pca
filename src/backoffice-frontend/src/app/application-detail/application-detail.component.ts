import { Component, OnInit, Input } from '@angular/core';
import { ApplicationDetail} from '../models/application-detail.model';
import { FriendlyHourPipe } from '../shared/pipes/friendly-hour.pipe';

import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { GetApplicationRowsService } from '../services/get-application-rows.service';
import { ApplicationRow } from '../models/application-row.model';
import { ApplicationDetailService } from '../services/application-detail.service';
import { ApplicationDetailServiceFake } from '../services/application-detail.service.fake';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.css'],
  providers: [ ApplicationDetailServiceFake ]
})
export class ApplicationDetailComponent implements OnInit {
 idapplication:string;
  @Input() application: ApplicationDetail;

  constructor(private route: ActivatedRoute, private router: Router,private applicationDetailServiceFake: ApplicationDetailServiceFake,
    ) {
      this.idapplication = this.route.snapshot.paramMap.get('id');
     }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idapplication = params.get('id');
    })
     this.getDettaglioApplication(this.idapplication);
   }
  
  
  getDettaglioApplication(id:string) {

    this.applicationDetailServiceFake.getApplication(id)
    .subscribe((application: ApplicationDetail) => this.application = application);
   
  }
   
  }
  

 



