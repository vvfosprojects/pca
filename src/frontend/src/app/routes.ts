import { Routes } from "@angular/router";
import { SubmissionResultComponent } from "./submission-result/submission-result.component";
import { ApplicationFormComponent } from "./application-form/application-form.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

export const appRoutes: Routes = [
    { path: 'application-form', component: ApplicationFormComponent },
    { path: 'submission-result',      component: SubmissionResultComponent },
    { path: '',
      redirectTo: '/application-form',
      pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
  ];