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
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CfCheckService } from '../service/cf-check.service';
import { CfCheckService_Fake } from '../service/cf-check-fake.service';
import { ApplicationService_Fake } from '../service/application-fake.service';
import { ApplicationService } from '../service/application.service';
import { SpidService } from '../service/spid.service';
import { SpidJwtService } from '../service/spid-jwt.service';
import { JwtInterceptor } from '../service/jwt.interceptor';

import { ApplicationFormComponent } from './application-form/application-form.component';
import { SubmissionResultComponent } from './submission-result/submission-result.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { appRoutes } from './routes';
import { environment } from '../environments/environment';

import { CfCheckServiceSuccess_Fake } from '../service/cf-check-fake-success.service';
import { ApplicationServiceSuccess_Fake } from '../service/application-fake-success.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatTabsModule} from '@angular/material/tabs';
import { HelpComponent } from './help/help.component';
import { SpidComponent } from './spid/spid.component';
import { MenuComponent } from './menu/menu.component';
import { SpidJwtComponent } from './spid-jwt/spid-jwt.component';


const ENABLETRACING = environment.enableTracing;
const APPROUTES = appRoutes;

@NgModule({
  declarations: [
    AppComponent,
    ApplicationFormComponent,
    SubmissionResultComponent,
    PageNotFoundComponent,
    HelpComponent,
    SpidComponent,
    MenuComponent,
    SpidJwtComponent
  ],
  imports: [
    RouterModule.forRoot(
      APPROUTES,
      { enableTracing: ENABLETRACING }
    ),
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
    MatBadgeModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTabsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'it-IT' },
    //{ provide: CfCheckService, useClass: CfCheckService_Fake },
    { provide: CfCheckService, useClass: CfCheckServiceSuccess_Fake },
    //{ provide: ApplicationService, useClass: ApplicationService_Fake },
    //{ provide: ApplicationService, useClass: ApplicationServiceSuccess_Fake },
    { provide: ApplicationService, useClass: ApplicationService },
    { provide: SpidService, useClass: SpidService },
    { provide: SpidJwtService, useClass: SpidJwtService },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
