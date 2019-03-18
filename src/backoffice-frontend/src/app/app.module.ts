import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {DemoMaterialModule} from './module/material-module';
import { LoginComponent } from './components/login/login.component';
import { ListaConcorsiComponent } from './components/lista-concorsi/lista-concorsi.component';
import { DacComponent } from './components/layout-domanda/dac/dac.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DacDomandeComponent } from './components/lista-domande/dac-domande/dac-domande.component';


import {CoursesService} from './services/dac/courses.service';
import {CourseResolver} from './services/dac/course.resolver';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './auth/auth-guard.service';
import {UploadModule} from './module/upload/upload.module';
import {GuestModule} from './module/route/guest.module';
import {UserModule} from './module/route/user.module';
import { UserComponent } from './layout/user/user.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { DialogAnnullaDomandaComponent } from './components/lista-domande/dac-domande/dialog-annulla-domanda/dialog-annulla-domanda.component';
import { EsitoProveComponent } from './components/esito-prove/esito-prove.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListaConcorsiComponent,
    DacComponent,
    PageNotFoundComponent,
    DacDomandeComponent,
    UserComponent,
    DialogAnnullaDomandaComponent,
    EsitoProveComponent,
  ],
  imports: [
    BrowserModule,
    DemoMaterialModule,
    UploadModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    GuestModule,
    UserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  entryComponents: [DialogAnnullaDomandaComponent],
  providers: [CoursesService, CourseResolver, AuthService, AuthGuardService],
  bootstrap: [AppComponent],

})
export class AppModule { }
