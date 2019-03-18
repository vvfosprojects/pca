import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppError} from '../../../../common/app-error';
import {NotFoundError} from '../../../../common/not-found-error';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpDacService} from '../../../services/dac/http/http-dac.service';
import {DomandaService} from '../../../services/dac/domanda.service';
import {AppService} from '../../../services/app.service';



@Component({
  selector: 'app-dac',
  templateUrl: './dac.component.html',
  styleUrls: ['./dac.component.css']
})
export class DacComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {



  applicationForm: FormGroup;
  idDomanda;

  constructor(
    private appService: AppService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpDacService,
    private domanda: DomandaService
  ) {
  }

  ngOnChanges() {
  }


  ngOnInit() {

    this.appService.setTitle('DOMANDA DAC');


    const id = this.route.snapshot.paramMap.get('id');
    this.domanda.setEsito(id);

    this.createForm();

  }

  ngAfterViewInit() {

    this.idDomanda = this.route.snapshot.paramMap.get('id');
    this.http.getDomanda(this.idDomanda)
      .subscribe(domanda => {


          this.applicationForm.controls['personalData'].patchValue({
            codiceFiscale: domanda.spid.codiceFiscale,
            nome: domanda.spid.nome,
            cognome: domanda.spid.cognome,
            dataDiNascita: domanda.spid.dataNascita,
            luogoNascita: domanda.spid.luogoDiNascita,
            residenza: domanda.spid.residenza,
            via: domanda.spid.via,
            telefono: domanda.spid.telefono,
            email: domanda.spid.email,
            domicilioDigitale: domanda.spid.domDigitale,

            istitutoFrequentato: domanda.istruzione.istitutoFrequentato,
            annoDiploma: domanda.istruzione.annoDiploma,
            tipoDiploma: domanda.istruzione.tipoDiploma,
            provinciaIstituto: domanda.istruzione.provinciaIstituto,
            comuneIstituto: domanda.istruzione.comuneIstituto,
            viaIstituto: domanda.istruzione.sedeIstituto,

            linguaSelezionata: domanda.linguaStraniera.lingua,
            titoloPref: ((domanda.titoliPreferenziali.length === 0) ? '(NESSUNO)' : '(NESSUNO)'),
            riserve: ((domanda.riserve.length === 0) ? '(NESSUNA)' : '(NESSUNA)'),

            catProtette: ((domanda.categorieProtette.isCategorieProtette) ? '4' : '3'),
            percInvalidita: domanda.categorieProtette.percInvalidita.toString(),
            dataCertificazione: domanda.categorieProtette.dataCertificazione,
            invaliditaEnte: domanda.categorieProtette.enteRilascioCertificato,
            drto_ausili: domanda.categorieProtette.ausilioProva,
            drto_tempiAggiuntivi: domanda.categorieProtette.tempiAggiuntivi,
            drto_esenzioneProvasel: domanda.categorieProtette.esenzioneProvaSelettiva,


          });
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            console.log('Error richiesta http');
          } else {
            console.log(error);
          }
        });
    this.applicationForm.disable();


  }

  ngOnDestroy() {
  }




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
        annoDiploma: [''],
        tipoDiploma: [''],
        provinciaIstituto: ['', [
        ]],
        comuneIstituto: ['', []],
        viaIstituto: ['', [

        ]],
        linguaSelezionata: ['', [

        ]],
        titoloPref: ['', []],
        numeroFigli: ['', [
        ]],
        riserve: ['', []],
        catProtette: ['', [

        ]],
        percInvalidita: ['', [

        ]],
        dataCertificazione: ['', []]
        ,
        invaliditaEnte: ['', []],
        drto_ausili: ['', []],
        drto_tempiAggiuntivi: ['', []],
        drto_esenzioneProvaPresel: ['', []],
        gdprCompliancy: ['', []]
      })
    });

  }


  /*
  * Boilert template code: Codice creato solo per evitare di scrivere codice verboso nella view HTML.
  *
  * NON TOCCAREN
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




