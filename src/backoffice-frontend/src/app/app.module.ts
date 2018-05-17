import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StatisticsServiceFake } from './statistics.service.fake';
import { StatisticsService } from './statistics.service';
import { AppComponent } from './app.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ApplicationTableComponent } from './application-table/application-table.component';

@NgModule({
  declarations: [
    AppComponent,
    StatisticsComponent,
    ApplicationTableComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    { provide: StatisticsService, useClass: StatisticsServiceFake }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
