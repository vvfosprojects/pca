import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainFormComponent} from '../components/main-form/main-form.component';
import {HelpComponent} from '../components/help/help.component';
import {SpidComponent} from '../components/spid-login/spid.component';
import {LoginComponent} from '../components/login/login.component';
import {SubmissionResultComponent} from '../components/submission-result/submission-result.component';
import {MainNavComponent} from '../layout/main-nav/main-nav.component';

const routes: Routes = [
  {
    path: '',
    component: MainNavComponent,
    children: [
      {path: 'main-form', component: MainFormComponent},
      {path: 'help', component: HelpComponent},
      {path: 'login', component: LoginComponent},
      {path: 'submission-result', component: SubmissionResultComponent},
    ]
  },
  {path: 'spid-login', component: SpidComponent},
  {path: '**', component: SpidComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
