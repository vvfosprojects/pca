import { Routes } from "@angular/router";
import { SubmissionResultComponent } from "./submission-result/submission-result.component";
import { ApplicationFormComponent } from "./application-form/application-form.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HelpComponent } from "./help/help.component";
import { SpidComponent } from "./spid/spid.component";
import { SpidJwtComponent } from "./spid-jwt/spid-jwt.component";

export const appRoutes: Routes = [
    { path: 'spid', component: SpidComponent },
    { path: 'spid-jwt', component: SpidJwtComponent },
    { path: 'application-form', component: ApplicationFormComponent },
    { path: 'submission-result', component: SubmissionResultComponent },
    { path: 'help', component: HelpComponent },
    { path: '',
      redirectTo: '/spid',
      pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
  ];