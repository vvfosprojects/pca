import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatBadgeModule
} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CfCheckService } from '../service/cf-check.service';
import { CfCheckService_Fake } from '../service/cf-check-fake.service';
import { ApplicationService_Fake } from '../service/application-fake.service';
import { ApplicationService } from '../service/application.service';
import { ApplicationFormComponent } from './application-form/application-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ApplicationFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'it' },
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
    { provide: CfCheckService, useClass: CfCheckService_Fake },
    { provide: ApplicationService, useClass: ApplicationService_Fake },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
