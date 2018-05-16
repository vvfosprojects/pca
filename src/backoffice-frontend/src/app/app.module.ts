import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';

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
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatTableModule
  ],
  providers: [
    { provide: StatisticsService, useClass: StatisticsServiceFake }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
