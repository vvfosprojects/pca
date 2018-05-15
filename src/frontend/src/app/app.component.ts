import { Component, NgModule } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import { CustomValidators, ConfirmValidParentMatcher, regExps, errorMessages } from './custom-validation'; 
import { Injectable, Inject } from '@angular/core';

/* import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; */
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatInputModule, MatButtonModule} from '@angular/material';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { CfCheckService } from '../service/cf-check.service';
import { Anagrafica } from './model/anagrafica.model';
import { CfCheckService_Fake } from '../service/cf-check-fake.service';
import { ApplicationService_Fake } from '../service/application-fake.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isChecked = Boolean();
  isCheckedPrivacy = Boolean();
  //sedeControl = new FormControl();
  userRegistrationForm: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

	errors = errorMessages;
  anagFormGroup: FormGroup;
  /* servFormGroup: FormGroup;
  patFormGroup: FormGroup;
 */
  constructor(private formBuilder: FormBuilder, private cfCheckService_Fake: CfCheckService_Fake, private applicationService_Fake: ApplicationService_Fake ) { 
    this.createForm();
    
    // this triggers the FiscalCode validation request to the server, and logs the response
/*     cfCheckService.cfCheck(new Anagrafica(
      "SPSMCL73T16L259D",
      "Marcello",
      "Esposito",
      new Date("1973-12-16"),
      "12345"
    )).subscribe(response => console.log(response));
 */ 

  

}
     
  createForm() {
  this.userRegistrationForm = this.formBuilder.group({
    anagGroup: this.formBuilder.group({
      codFis: ['', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16)
      ]],
      nome: ['', [
        Validators.required,
        Validators.maxLength(40)
      ]],
      cognome: ['', [
        Validators.required,
        Validators.maxLength(40)
      ]],
      tel: ['', Validators.required],
      nascita: ['', Validators.required]
    }),
    emailGroup: this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      confirmEmail: ['', Validators.required]
    }, { validator: CustomValidators.childrenEqual}),
    servizioGroup: this.formBuilder.group({
      sede: ['', Validators.required],
      giorni: ['', Validators.min(0)]
    }),
    patenteGroup: this.formBuilder.group({
      patente: ['', Validators.required],
      categoria: ['', Validators.required],
      numero: ['', Validators.required],
      ente: ['', Validators.required],
      dataRilascio: ['', Validators.required],
      dataScadenza: ['', Validators.required]
    })
  });
}

  register(): void {
    // API call to register your user
    //this.cfCheckService.checkCf();
    this.cfCheckService_Fake.cfCheck().subscribe(response => console.log(response));
  }
  
  inserisci(): void {
    // API call to register your user
    //this.cfCheckService.checkCf();
    this.applicationService_Fake.checkDomanda().subscribe(response => console.log(response));
  }
  
  sediGroups = [
    {
      name: 'Toscana',
      sede: [
        { value: 'dir-tos', viewValue: 'Dir-TOS' },
        { value: 'fi', viewValue: 'Firenze' },
        { value: 'ar', viewValue: 'Arezzo' },
        { value: 'gr', viewValue: 'Grosseto' }
      ]
    },
    {
      name: 'Lazio',
      sede: [
        { value: 'dir-laz', viewValue: 'Dir-LAZ' },
        { value: 'rm', viewValue: 'Roma' },
        { value: 'fr', viewValue: 'Frosinone' },
        { value: 'lt', viewValue: 'Latina' }
      ]
    },
    {
      name: 'Abruzzo',
      sede: [
        { value: 'dir-aq', viewValue: 'Dir-AQU' },
        { value: 'ch', viewValue: 'Chieti' },
        { value: 'pe', viewValue: 'Pescara' },
        { value: 'te', viewValue: 'Teramo' }
      ]
    }
  ];
  
  onChange($event){
    console.log($event);
  }
}
