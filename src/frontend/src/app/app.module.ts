import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material';
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
    MatNativeDateModule
  ],
  providers: [ CfCheckService, CfCheckService_Fake, ApplicationService_Fake, ApplicationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
