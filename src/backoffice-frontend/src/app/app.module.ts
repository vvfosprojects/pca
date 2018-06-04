import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { StatisticsServiceFake } from './services/statistics.service.fake';
import { StatisticsService } from './services/statistics.service';
import { GetApplicationRowsServiceFake } from './services/get-application-rows.service.fake';
import { GetApplicationRowsService } from './services/get-application-rows.service';
import { ApplicationDetailService } from './services/application-detail.service';
import { ApplicationDetailServiceFake } from './services/application-detail.service.fake';
import { AppComponent } from './app.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ApplicationTableComponent } from './application-table/application-table.component';
import { FriendlyHourPipe } from './shared/pipes/friendly-hour.pipe';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';
//import { PageNotFoundComponent } from "app/not-found.component";

const ROUTES = [
  {
   path: '',
   component: ApplicationTableComponent
 }, 
 {
 path: 'application-detail/:id', 
   component: ApplicationDetailComponent
  }];

  /* { path: '**', 
   component: PageNotFoundComponent 
 } */
// }



@NgModule({
  declarations: [
    AppComponent,
    StatisticsComponent,
    ApplicationTableComponent,
    FriendlyHourPipe,
    ApplicationDetailComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    { provide: ApplicationDetailService, useClass: ApplicationDetailServiceFake },
    { provide: StatisticsService, useClass: StatisticsServiceFake },
    { provide: GetApplicationRowsService, useClass: GetApplicationRowsServiceFake },
    
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
