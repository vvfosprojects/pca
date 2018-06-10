import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { routes } from './routes';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthServiceFake } from './services/auth.service.fake';
import { AuthInterceptor } from './services/auth.interceptor';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    StatisticsComponent,
    ApplicationTableComponent,
    FriendlyHourPipe,
    ApplicationDetailComponent,
    ControlPanelComponent,
    PageNotFoundComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: ApplicationDetailService, useClass: ApplicationDetailServiceFake },
    // { provide: ApplicationDetailService, useClass: ApplicationDetailService },
    
    { provide: StatisticsService, useClass: StatisticsServiceFake },
    // { provide: StatisticsService, useClass: StatisticsService },
    
    { provide: GetApplicationRowsService, useClass: GetApplicationRowsServiceFake },
    // { provide: GetApplicationRowsService, useClass: GetApplicationRowsService },
    
    { provide: AuthService, useClass: AuthServiceFake },
    // { provide: AuthService, useClass: AuthService },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
