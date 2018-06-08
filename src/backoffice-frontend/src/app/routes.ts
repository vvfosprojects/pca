import { ControlPanelComponent } from "./control-panel/control-panel.component";
import { ApplicationDetailComponent } from "./application-detail/application-detail.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

export const routes = [
    {
      path: 'control-panel',
      component: ControlPanelComponent
    },
    {
      path: 'application-detail/:id',
      component: ApplicationDetailComponent
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