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
  servFormGroup: FormGroup;
  patFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private cfCheckService: CfCheckService) { 
    this.createForm();
  }
     
  createForm() {
  this.userRegistrationForm = this.formBuilder.group({
    anagGroup: this.formBuilder.group({
      codFis: ['', [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(14)
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
    }, { validator: CustomValidators.childrenEqual}),
    emailGroup: this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      confirmEmail: ['', Validators.required]
    }, { validator: CustomValidators.childrenEqual})
  });
}

  register(): void {
    // API call to register your user
    this.cfCheckService.checkCf();
  }
    
  numberDaysFormControl = new FormControl('', [
    Validators.min(0)
  ]);

  
  matcher = new MyErrorStateMatcher();

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
