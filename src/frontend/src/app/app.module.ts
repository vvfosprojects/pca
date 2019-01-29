import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { HelpComponent } from './components/help/help.component';
import { SpidComponent } from './components/spid-login/spid.component';
import { MainFormComponent } from './components/main-form/main-form.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { LoginComponent } from './components/login/login.component';
import { SpidDataComponent } from './components/spid-data/spid-data.component';

import { SubmissionResultComponent } from './components/submission-result/submission-result.component';
import {GetDataService} from './services/get-data.service';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MaterialModule} from './module/material.module';
import {AppRoutingModule} from './module/routes.module';
import { MainNavComponent } from './layout/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HelpComponent,
    SpidComponent,
    MainFormComponent,
    TopbarComponent,
    LoginComponent,
    SpidDataComponent,
    SubmissionResultComponent,
    MainNavComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxMatSelectSearchModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'it-IT' },
    GetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
