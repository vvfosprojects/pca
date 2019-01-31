import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatSelect} from '@angular/material';
import {CustomValidators} from '../../validators/customValidators';
import {ReplaySubject, Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {GetDataService} from '../../services/get-data.service';
import {AppError} from '../../common/app-error';
import {NotFoundError} from '../../common/not-found-error';
import {Province, TableEntity} from '../../model/province';
import {Comuni} from '../../model/comuni';
import {PutDataService} from '../../services/put-data.service';
import {Router} from '@angular/router';
import {TitoliPreferenziali, TitoliPreferenzialiOut} from '../../model/titoliPreferenziali';
import {Riserve, RiserveOut} from '../../model/riserve';
import {Istruzione} from '../../model/istruzione';
import {LingueStraniere} from '../../model/lingueStraniere';

// Controllo dell'input in tempo reale

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('singleSelect') singleSelect: MatSelect;
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

  maxDate = new Date(Date.now());

  /* TODO: Trovare un metodo per inserire il seguente formControl nel gruppo ApplicationForm */
  // public provinceDropdown: FormControl = new FormControl();

  /** Lista delle province filtrate dalle parole chiavi nel campo **/
  public filteredBanks: ReplaySubject<String[]> = new ReplaySubject<String[]>(1);

  /** Lista dei comuni filtrate dalle parole chiavi nel campo **/
  public filteredComuni: ReplaySubject<String[]> = new ReplaySubject<String[]>(1);


  ngOnInit() {
    this.service.getProvince().subscribe((value: Province) => {

        /*
              Fin quando non trovo un modo per passare al filtro l'oggetto mi creo un array di solo stringhe
        */

        console.log(value);

        for (const i of value.table) {
          this.provinceObj.push(i);
          this.province.push(i.provincia);
        }
        this.setInitialValue(this.filteredBanks);

        this.filteredBanks.next(this.province.slice());

      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          console.log('Error richiesta http');
        } else {
          console.log(error);
        }
      });


    this.service.getLingueStraniere().subscribe((value: LingueStraniere[]) => {
        this.lingueStraniere = value;
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          console.log('Error richiesta http');
        } else {
          console.log(error);
        }
      });

    this.service.getTitoliPreferenziali().subscribe((value: TitoliPreferenziali[]) => {
        this.titoliPreferenziali = value;
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          console.log('Error richiesta http');
        } else {
          console.log(error);
        }
      });

    this.service.getRiserve().subscribe((value: Riserve[]) => {
        this.riserveElenco = value;
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          console.log('Error richiesta http');
        } else {
          console.log(error);
        }
      });


    // Analizza i cambiamenti del testo nel campo di ricerca del dropdown search
    this.provinceDropdown.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterList(this.province, this.provinceDropdown, this.filteredBanks);
      });

  }

  ngAfterViewInit() {
    if (this.istitutoFrequentato.value === '' || this.istitutoFrequentato.value == null) {
      this.testoDomanda = 'Invia Domanda';
    } else {
      this.testoDomanda = 'Modifica Domanda';
    }


    this.service.getDomanda().subscribe((domanda: any) => {
      this.popolaForm(domanda);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          console.log('Error richiesta http');
        } else {
          console.log(error);
        }
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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
   * Imposta il valore iniziale dopo che il filtro è stato inizializzato
   */

  private setInitialValue(value) {
    value
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: String, b: String) => a && b && a === b;
      });
  }

  /**
   * Filtra la lista durante l'input
   */

  private filterList(value, form, filter) {
    if (!value) {
      return;
    }
    // ottiene la keyword di ricerca
    let search = form.value;
    if (!search) {
      filter.next(value.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // Filtra le province
    filter.next(
      value.filter(prov => prov.toLocaleLowerCase().indexOf(search) > -1)
    );
  }


  /*
   * TODO: Suddividere il gruppo in ulteriori sottogruppi in modo da rendere l'applicazione più modulare. ! NON URGERNTE
   */

  createForm() {
    this.applicationForm = this.fb.group({
      personalData: this.fb.group({
        istitutoFrequentato: ['', [
          Validators.required,
          Validators.maxLength(255),
          CustomValidators.noWhitespaces,
        ]],
        annoDiploma: ['', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.max(new Date().getFullYear()),
          CustomValidators.onlyNumber,
          CustomValidators.noWhitespaces,
        ]],
        tipoDiploma: ['', [
          Validators.required,
          Validators.maxLength(255),
          CustomValidators.noWhitespaces,
        ]],
        provinciaIstituto: ['', [
          Validators.required
        ]],
        provinceDropdown: new FormControl(),
        comuniDropdown: new FormControl(),
        comuneIstituto: ['', []],
        viaIstituto: ['', [
          Validators.maxLength(255),
          CustomValidators.noWhitespaces,
        ]],
        linguaSelezionata: ['', [
          Validators.required
        ]],
        titoloPref: ['', []],
        numeroFigli: ['', [
          CustomValidators.noWhitespaces,
        ]],
        riserve: ['', []],
        catProtette: ['', [
          Validators.required,
        ]],
        percInvalidita: ['', [
          Validators.maxLength(3),
          Validators.max(100),
          Validators.min(1),
          CustomValidators.onlyNumber,
          CustomValidators.noWhitespaces,
        ]],
        dataCertificazione: ['', []]
        ,
        invaliditaEnte: ['', []],
        drto_ausili: ['', []],
        drto_tempiAggiuntivi: ['', []],
        drto_esenzioneProvaPresel: ['', []],
        idoneita: ['', [Validators.required]],
        gdprCompliancy: ['', [Validators.required]]
      })
    });
  }


  /*
  * OPTIMIZE: Da migliorare, attualmente non ha priorità urgente
  *  Fin quando non trovo una soluzione per far il parsing dell'oggetto nel filtro uso una lista clonata di sole stringhe
  *  per confrontarmi con i dati presi dal server. Devo serializzarmi i dati perchè il backend chiama i comuni dal codice provincia
  *  non dal nome provincia.
  *  TODO: Serializzare i dati per prendere il codice provincia dal backend non dal locale
  */

  onSelectProvince() {
    for (const i of this.provinceObj) {
      if (i.provincia.toLowerCase() === this.provinciaIstituto.value.toLowerCase()) {
        const codiceProvincia = i.codProvincia;
        this.service.getComuni(codiceProvincia).subscribe((value: Comuni) => {
            this.comuni.length = 0;
            for (const k of value.table) {
              this.comuni.push(k.comune);
            }

            // Devo fare il sort altrimenti roma non appare come primo elemento

            this.comuni.sort((a, b) => {
              return a.length - b.length; // ASC, For Descending order use: b - a
            });


            this.setInitialValue(this.filteredComuni);
            this.filteredComuni.next(this.comuni.slice());

          },
          (error: AppError) => {
            if (error instanceof NotFoundError) {
              console.log('Error richiesta http');
            } else {
              console.log(error);
            }
          });

        // Analizza i cambiamenti del testo nel campo di ricerca del dropdown search
        this.comuniDropdown.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterList(this.comuni, this.comuniDropdown, this.filteredComuni);
          });
        break;
      }
    }
  }

  /*
    *  OPTIMIZE: Rifattorizzare il codice
    *  Essendo che il campo numero figli è dipendente devo controllare se l'utente ha figli o meno,
    *  in caso lo selezioni rendo obbligatorio il numero dei figli, se l'utente imposta i dati e poi deseleziona il fatto di avere figli
    *  mi devo assicurare di cancellare i dati da lui immessi e togliere il 'required' dal form
    */

  checkFigli() {
    /*
    * Il multiple select crea un array di elementi selezionati ma non specifica quelli non selezionati, la creazione non è ordinata ma
    * crescente dunque per ora mi itero per vedere se è presente il valore selezionato
    * TODO: Rendere la complessità della ricerca minore.
    * */

    if (this.titoloPref.value.includes(16)) {
      this.numeroFigli.setValidators([Validators.required]);
      this.numeroFigli.updateValueAndValidity();
    } else {
      this.numeroFigli.setValidators([]);
      this.numeroFigli.updateValueAndValidity();
      this.numeroFigli.patchValue(null);
    }
  }

  /*
  *  OPTIMIZE: Rifattorizzare il codice
  *  Essendo che i campi di invalidità sono dipendenti devo controllare se l'utente ha selezionato le categorie protette,
  *  in caso le selezioni le rendo obbligatorie, se l'utente imposta i dati e poi deseleziona l'invalidità mi devo assicurare
  *  di cancellare i dati da lui immessi e togliere il 'required' dal form
  */

  controlloRequiredCategorieProtette() {

    if (this.catProtette.value.includes(4)) {
      this.percInvalidita.setValidators([Validators.required]);
      this.percInvalidita.updateValueAndValidity();

      this.dataCertificazione.setValidators([Validators.required]);
      this.dataCertificazione.updateValueAndValidity();

      this.invaliditaEnte.setValidators([Validators.required]);
      this.invaliditaEnte.updateValueAndValidity();
    } else {
      this.percInvalidita.setValidators([]);
      this.percInvalidita.updateValueAndValidity();

      this.dataCertificazione.setValidators([]);
      this.dataCertificazione.updateValueAndValidity();

      this.invaliditaEnte.setValidators([]);
      this.invaliditaEnte.updateValueAndValidity();

      this.drto_ausili.setValidators([]);
      this.drto_ausili.updateValueAndValidity();

      this.drto_esenzioneProvaPresel.setValidators([]);
      this.drto_esenzioneProvaPresel.updateValueAndValidity();

      this.drto_tempiAggiuntivi.setValidators([]);
      this.drto_tempiAggiuntivi.updateValueAndValidity();

      this.percInvalidita.patchValue(null);
      this.dataCertificazione.patchValue(null);
      this.invaliditaEnte.patchValue(null);

      this.drto_ausili.patchValue(false);
      this.drto_tempiAggiuntivi.patchValue(false);
      this.drto_esenzioneProvaPresel.patchValue(false);

    }
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


  // Visualizza le scelte dell'utente nella view, serve perchè mat-select usa un array di numeri

  returnTitoliSelectedValue(value: number) {
    return this.titoliPreferenziali[value].titolo;
  }

  // Visualizza le scelte dell'utente nella view, serve perchè mat-select usa un array di numeri

  returnRiserveSelectedValue(value: number) {
    return this.riserveElenco[value].riserva;
  }

  parseIstruzione() {
    const istruzioneObj: Istruzione = {
      istitutoFrequentato: this.istitutoFrequentato.value,
      tipoDiploma: this.tipoDiploma.value,
      annoDiploma: this.annoDiploma.value,
      provinciaIstituto: this.provinciaIstituto.value,
      comuneIstituto: this.comuneIstituto.value,
      sedeIstituto: this.viaIstituto.value
    };
    return istruzioneObj;
  }

  parseLingueStraniere() {
    return this.lingueStraniere[this.linguaSelezionata.value];
  }

  parseFigliCarico() {
    const figliObj = {
      haveSon: false,
      numSons: 0,
    };

    if (this.titoloPref.value.includes(16)) {
      figliObj.haveSon = true;
      figliObj.numSons = this.numeroFigli.value;
    }

    return figliObj;
  }

  parseTitoliPreferenziali() {

    const titoliPreferenzialiObj: TitoliPreferenzialiOut[] = [];
    const titoliSelected: TitoliPreferenzialiOut[] = [];

    for (const i of this.titoliPreferenziali) {
      const obj: TitoliPreferenzialiOut = {
        id: i.id,
        titolo: i.titolo,
        isSelected: false,
      };
      titoliPreferenzialiObj.push(obj);
    }

    for (const x of titoliPreferenzialiObj) {
      for (const i of this.titoloPref.value) {
        if ((i + 1) === x.id) {
          x.isSelected = true;
          titoliSelected.push(x);
        }
      }
    }

    return titoliSelected;
  }

  parseRiserve() {
    const riserveObj: RiserveOut[] = [];
    const riserveSelected: RiserveOut[] = [];

    for (const i of this.riserveElenco) {
      const obj: RiserveOut = {
        id: i.id,
        riserva: i.riserva,
        isSelected: false,
      };
      riserveObj.push(obj);
    }

    for (const x of riserveObj) {
      for (const i of this.riserve.value) {
        if ((i + 1) === x.id) {
          x.isSelected = true;
          riserveSelected.push(x);
        }
      }
    }

    return riserveSelected;
  }

  parseCategorieProtette() {

    const objCatProtette = {
      isCategegorieProtette: false,
      percentualeInvalidita: null,
      dataCertificazione: null,
      enteRilascioCertificato: null,
      ausilioProva: null,
      tempiaggiuntivi: null,
      esenzioneProvaSelettiva: null,
    };

    if (this.catProtette.value.includes(4)) {
      objCatProtette.isCategegorieProtette = true;
      objCatProtette.percentualeInvalidita = this.percInvalidita.value;
      objCatProtette.dataCertificazione = this.dataCertificazione.value;
      objCatProtette.enteRilascioCertificato = this.invaliditaEnte.value;
      objCatProtette.ausilioProva = this.drto_ausili.value;
      objCatProtette.tempiaggiuntivi = this.drto_tempiAggiuntivi.value;
      objCatProtette.esenzioneProvaSelettiva = this.drto_esenzioneProvaPresel.value;
    }
    return objCatProtette;
  }


  /*
* Il compito va assegnato ad un service visto che dovrà essere passato tramite protoccolo HTTP
* TODO: Rifattorizzare il codice, da renderlo modulare è troppo corposo
* La serializzazzione dei dati va fatta in un altro metodo non nel sendForm
* */

  sendForm() {

    const objDomanda = {
      Istruzione: this.parseIstruzione(),
      LinguaStraniera: this.parseLingueStraniere(),
      TitoliPreferenziali: this.parseTitoliPreferenziali(),
      FigliACarico: this.parseFigliCarico(),
      Riserve: this.parseRiserve(),
      CategorieProtette: this.parseCategorieProtette()
    };


    this.post.putDomanda(objDomanda).subscribe(() => {
      console.log(objDomanda);
      this.router.navigate(['submission-result']);
    });

  }

  isDone() {
    if (this.applicationForm.valid && this.gdprCompliancy.value && this.idoneita.value) {
      return true;
    }
    return false;
  }



  popolaForm(domanda: any) {

    // ISTRUZIONE

    this.istitutoFrequentato.patchValue(domanda.Istruzione.istitutoFrequentato);
    this.annoDiploma.patchValue(domanda.Istruzione.annoDiploma);
    this.tipoDiploma.patchValue(domanda.Istruzione.tipoDiploma);
    this.provinciaIstituto.patchValue(domanda.Istruzione.provinciaIstituto.toUpperCase());
    this.onSelectProvince();
    this.comuneIstituto.patchValue(domanda.Istruzione.comuneIstituto.toUpperCase());
    this.viaIstituto.patchValue(domanda.Istruzione.sedeIstituto);

    this.linguaSelezionata.patchValue(domanda.LinguaStraniera.id - 1);

    const arrTit = [];
    for (const i of domanda.TitoliPreferenziali) {
      console.log(i.id);
      arrTit.push(Number(i.id - 1));
    }

    this.titoloPref.patchValue((arrTit));
    this.checkFigli();
    this.numeroFigli.patchValue(domanda.FigliACarico.numSons);

    const arrRis = [];
    for (const i of domanda.Riserve) {
      console.log(i.id - 1);
      arrRis.push(Number(i.id - 1));
    }
    this.riserve.patchValue(arrRis);

    if (domanda.CategorieProtette.isCategegorieProtette) {
      this.catProtette.patchValue('4');
      this.percInvalidita.patchValue(domanda.CategorieProtette.percentualeInvalidita.toString());
      this.dataCertificazione.patchValue(domanda.CategorieProtette.dataCertificazione);
      this.invaliditaEnte.patchValue(domanda.CategorieProtette.enteRilascioCertificato);
      this.drto_ausili.patchValue(domanda.CategorieProtette.ausilioProva);
      this.drto_tempiAggiuntivi.patchValue(domanda.CategorieProtette.tempiaggiuntivi);
      this.drto_esenzioneProvaPresel.patchValue(domanda.CategorieProtette.esenzioneProvaSelettiva);
    } else {
      this.catProtette.patchValue('3');
    }
  }

}




