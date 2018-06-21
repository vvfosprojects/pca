import { Component, OnInit, Input } from '@angular/core';
import { ApplicationDetail } from '../models/application-detail.model';
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
  providers: [ApplicationDetailServiceFake, Location]
})
export class ApplicationDetailComponent implements OnInit {
  private application: ApplicationDetail;
  private pagina: string;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationDetailService: ApplicationDetailService
    ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      
     this.applicationDetailService.getApplication(id)
     .subscribe(application => this.application = application);
    });
    
   
  }

 /*  goBack(): void {
     this.router.navigate(['/control-panel']); 
 } */
}






