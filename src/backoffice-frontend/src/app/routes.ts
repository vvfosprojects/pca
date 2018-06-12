import { ControlPanelComponent } from "./control-panel/control-panel.component";
import { ApplicationDetailComponent } from "./application-detail/application-detail.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LoginComponent } from "./login/login.component";
import { AuthService } from "./services/auth.service";
import { ApplicationTableComponent } from "./application-table/application-table.component";

export const routes = [
    {
      path: 'control-panel',
      canActivate: [ AuthService ],
      component: ControlPanelComponent
    },
    {
      path: 'application-detail/:id',
      canActivate: [ AuthService ],
      component: ApplicationDetailComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: '',
      redirectTo: '/control-panel',
      pathMatch: 'full'
    },
    {
      path: '**',
      component: PageNotFoundComponent
    }
  ];