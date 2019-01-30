import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainFormComponent} from '../components/main-form/main-form.component';
import {HelpComponent} from '../components/help/help.component';
import {SpidComponent} from '../components/spid-login/spid.component';
import {LoginComponent} from '../components/login/login.component';
import {SubmissionResultComponent} from '../components/submission-result/submission-result.component';
import {PageNotFoundComponent} from '../components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'main-form', component: MainFormComponent},
  {path: 'help', component: HelpComponent},
  {path: 'spid-login', component: SpidComponent},
  {path: 'login', component: LoginComponent},
  {path: 'submission-result', component: SubmissionResultComponent},
  {
    path: '',
    redirectTo: '/main-form',
    pathMatch: 'full',
  },

  {path: '**', component: MainFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
