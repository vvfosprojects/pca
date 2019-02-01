import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetDataService} from '../../services/get-data.service';
import {AppError} from '../../common/app-error';
import {NotFoundError} from '../../common/not-found-error';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {MyErrorStateMatcher} from '../main-form/main-form.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TableEntity} from '../../model/province';
import {TitoliPreferenziali} from '../../model/titoliPreferenziali';
import {LingueStraniere} from '../../model/lingueStraniere';
import {Riserve} from '../../model/riserve';
import {PutDataService} from '../../services/put-data.service';

@Component({
  selector: 'app-submission-result',
  templateUrl: './submission-result.component.html',
  styleUrls: ['./submission-result.component.css']
})
export class SubmissionResultComponent implements OnInit {

  private _onDestroy = new Subject<void>();

  testoDomanda: string;
  matcher = new MyErrorStateMatcher();
  applicationForm: FormGroup;

  province: string[] = [];
  comuni: string[] = [];

  provinceObj: TableEntity[] = [];

  titoliPreferenziali: TitoliPreferenziali[];
  riserveElenco: Riserve[];
  lingueStraniere: LingueStraniere[];

  ngOnInit() {


    this.service.getSpid().subscribe( (spid: any) => {
      // SPID

      this.codiceFiscale.patchValue(spid.codiceFiscale);
      this.nome.patchValue(spid.nome);
      this.cognome.patchValue(spid.cognome);
      this.dataDiNascita.patchValue(spid.dataNascita);
      this.luogoNascita.patchValue(spid.luogoDiNascita);
      this.residenza.patchValue(spid.residenza);
      this.via.patchValue(spid.via);
      this.telefono.patchValue(spid.telefono);
      this.email.patchValue(spid.email);
      this.domicilioDigitale.patchValue(spid.domDigitale);


    });
    this.service.getDomanda().subscribe((domanda: any) => {

      console.log(domanda);

// ISTRUZIONE

        this.istitutoFrequentato.patchValue(domanda.Istruzione.istitutoFrequentato);
        this.annoDiploma.patchValue(domanda.Istruzione.annoDiploma);
        this.tipoDiploma.patchValue(domanda.Istruzione.tipoDiploma);
        this.provinciaIstituto.patchValue(domanda.Istruzione.provinciaIstituto.toUpperCase());
        this.comuneIstituto.patchValue(domanda.Istruzione.comuneIstituto.toUpperCase());
        this.viaIstituto.patchValue(domanda.Istruzione.sedeIstituto);
// LINGUA
        this.linguaSelezionata.patchValue(domanda.LinguaStraniera.lingua);

        this.titoloPref.patchValue((domanda.TitoliPreferenziali));
        this.numeroFigli.patchValue(domanda.FigliACarico.numSons);
        this.riserve.patchValue(domanda.Riserve);


        // CATEGORIE PROTETTE
        this.catProtette.patchValue((domanda.CategorieProtette.isCategegorieProtette === true) ? 'SI' : 'NO');
        this.percInvalidita.patchValue(domanda.CategorieProtette.percentualeInvalidita);
        this.dataCertificazione.patchValue(domanda.CategorieProtette.dataCertificazione);
        this.invaliditaEnte.patchValue(domanda.CategorieProtette.enteRilascioCertificato);
        this.drto_ausili.patchValue(domanda.CategorieProtette.ausilioProva);
        this.drto_tempiAggiuntivi.patchValue(domanda.CategorieProtette.tempiaggiuntivi);
        this.drto_esenzioneProvaPresel.patchValue(domanda.CategorieProtette.esenzioneProvaSelettiva);

      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          console.log('Error richiesta http');
        } else {
          console.log(error);
        }
      });
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private service: GetDataService,
    private post: PutDataService,
    private router: Router,
  ) {
    this.createForm();
  }


  /**
   * Sets the initial value after the filter are loaded initially
   */


  /*
   * TODO: Suddividere il gruppo in ulteriori sottogruppi in modo da rendere l'applicazione più modulare. ! NON URGERNTE
   */

  createForm() {
    this.applicationForm = this.fb.group({
      personalData: this.fb.group({
        codiceFiscale: [''],
        nome: [''],
        cognome: [''],
        dataDiNascita: [''],
        luogoNascita: [''],
        residenza: [''],
        via: [''],
        telefono: [''],
        email: [''],
        domicilioDigitale: [''],
        istitutoFrequentato: [''],
        annoDiploma: ['',  ],
        tipoDiploma: ['', ],
        provinciaIstituto: [''],
        comuneIstituto: [''],
        viaIstituto: [''],
        linguaSelezionata: [],
        titoloPref: [''],
        numeroFigli: [''],
        riserve: ['', []],
        catProtette: [''],
        percInvalidita: [''],
        dataCertificazione: [''],
        invaliditaEnte: [''],
        drto_ausili: [''],
        drto_tempiAggiuntivi: [''],
        drto_esenzioneProvaPresel: [''],
        idoneita: [''],
        gdprCompliancy: ['']
      })
    });
  }

  modificaDomanda() {
    this.router.navigate(['submission-result']);
  }


  /*
  * Boilert template code: Codice creato solo per evitare di scrivere codice verboso nella view HTML.
  *
  * NON TOCCARE
  * */

  get istitutoFrequentato() {
    return this.applicationForm.get('personalData.istitutoFrequentato');
  }

  get annoDiploma() {
    return this.applicationForm.get('personalData.annoDiploma');
  }

  get tipoDiploma() {
    return this.applicationForm.get('personalData.tipoDiploma');
  }

  get provinciaIstituto() {
    return this.applicationForm.get('personalData.provinciaIstituto');
  }

  get comuneIstituto() {
    return this.applicationForm.get('personalData.comuneIstituto');
  }

  get viaIstituto() {
    return this.applicationForm.get('personalData.viaIstituto');
  }

  get linguaSelezionata() {
    return this.applicationForm.get('personalData.linguaSelezionata');
  }

  get titoloPref() {
    return this.applicationForm.get('personalData.titoloPref');
  }

  get numeroFigli() {
    return this.applicationForm.get('personalData.numeroFigli');
  }

  get riserve() {
    return this.applicationForm.get('personalData.riserve');
  }

  get catProtette() {
    return this.applicationForm.get('personalData.catProtette');
  }

  get percInvalidita() {
    return this.applicationForm.get('personalData.percInvalidita');
  }

  get dataCertificazione() {
    return this.applicationForm.get('personalData.dataCertificazione');
  }

  get invaliditaEnte() {
    return this.applicationForm.get('personalData.invaliditaEnte');
  }

  get drto_ausili() {
    return this.applicationForm.get('personalData.drto_ausili');
  }

  get drto_tempiAggiuntivi() {
    return this.applicationForm.get('personalData.drto_tempiAggiuntivi');
  }

  get drto_esenzioneProvaPresel() {
    return this.applicationForm.get('personalData.drto_esenzioneProvaPresel');
  }

  get idoneita() {
    return this.applicationForm.get('personalData.idoneita');
  }

  get gdprCompliancy() {
    return this.applicationForm.get('personalData.gdprCompliancy');
  }

  get provinceDropdown() {
    return this.applicationForm.get('personalData.provinceDropdown');
  }

  get comuniDropdown() {
    return this.applicationForm.get('personalData.comuniDropdown');
  }

  get codiceFiscale() {
    return this.applicationForm.get('personalData.codiceFiscale');
  }

  get nome() {
    return this.applicationForm.get('personalData.nome');
  }

  get cognome() {
    return this.applicationForm.get('personalData.cognome');
  }

  get dataDiNascita() {
    return this.applicationForm.get('personalData.dataDiNascita');
  }

  get luogoNascita() {
    return this.applicationForm.get('personalData.luogoNascita');
  }

  get residenza() {
    return this.applicationForm.get('personalData.residenza');
  }

  get via() {
    return this.applicationForm.get('personalData.via');
  }

  get telefono() {
    return this.applicationForm.get('personalData.telefono');
  }

  get email() {
    return this.applicationForm.get('personalData.email');
  }


  get domicilioDigitale() {
    return this.applicationForm.get('personalData.domicilioDigitale');
  }

}




