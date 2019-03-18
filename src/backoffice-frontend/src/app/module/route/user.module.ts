import {RouterModule, Routes} from '@angular/router';
import {ListaConcorsiComponent} from '../../components/lista-concorsi/lista-concorsi.component';
import {AuthGuardService} from '../../auth/auth-guard.service';
import {DacDomandeComponent} from '../../components/lista-domande/dac-domande/dac-domande.component';
import {CourseResolver} from '../../services/dac/course.resolver';
import {DacComponent} from '../../components/layout-domanda/dac/dac.component';
import {NgModule} from '@angular/core';
import {UploadComponent} from '../../components/upload/upload.component';
import {UserComponent} from '../../layout/user/user.component';
import {EsitoProveComponent} from '../../components/esito-prove/esito-prove.component';
import {PageNotFoundComponent} from '../../components/page-not-found/page-not-found.component';


export const concorsi: Routes = [


  {
    path: '', component: UserComponent, canActivate: [AuthGuardService], children: [
      {path: 'concorsi', component: ListaConcorsiComponent},
      {
        path: 'concorso/:id',
        component: DacDomandeComponent,
        resolve: {
          course: CourseResolver
        }
      },
      {
        path: 'esito-prova/:idConcorso/:idDomanda',
        component: EsitoProveComponent,
      },
      {
        path: 'domanda-dac/:id',
        component: DacComponent,
      },
      {
        path: 'upload',
        component: UploadComponent,
      },
      {
        path: 'not-found',
        component: PageNotFoundComponent,
      },
      {
        path: '**',
        component: ListaConcorsiComponent,
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(concorsi)],
  exports: [RouterModule],
})
export class UserModule {
}
