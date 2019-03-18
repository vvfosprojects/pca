import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {DomandaService} from '../../services/dac/domanda.service';
import {AppService} from '../../services/app.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  implements OnInit {

  title: String;

  idConcorso;
  idDomanda;
  titoloPagina: any;

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private router: Router, private domanda: DomandaService,
              private appService: AppService) {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  ngOnInit() {
    this.appService.getTitle().subscribe(appTitle => this.title = appTitle);
  }

  isInEsito() {
    const url = this.router.url;

    const regexp = new RegExp(`([a-z]+)*\\-([a-z]+)*\\/([0-9]+)*\\/([0-9]+)*\\/?$`);

    if (regexp.test(`${url}`)) {
      return true;
    }
    return false;
  }


  goToDomanda() {
    const value = this.domanda.getDomanda();
    const idConcorso = value[0];
    const idDomanda = value[1];

    this.router.navigate(['domanda-dac/' + idDomanda]);
  }

  goToEsito() {
    this.router.navigate(['esito-prova/1/' + this.domanda.getEsito()]);
  }

  isInDomanda() {
    const url = this.router.url;

    const regexp = new RegExp(`([a-z]+)*\\-([a-z]+)*\\/([0-9]+)/?$`);

    if (regexp.test(`${url}`)) {
      return true;
    }
    return false;
  }


  showMenuContestuale() {
    if (this.isInDomanda()) {
      return true;
    }
    if (this.isInEsito() ) {
      return true;
    }

    return false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login' ]);
  }
}
