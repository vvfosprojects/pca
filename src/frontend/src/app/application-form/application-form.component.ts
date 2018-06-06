import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { of as observableOf, Observable, timer } from 'rxjs';
import { map, filter, delay, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { CfCheckService } from '../../service/cf-check.service';
import { Anagrafica } from '../model/anagrafica.model';
import { CfCheckOutcome } from '../model/cf-check-outcome.model';
import { BuGroups } from './bu-groups';
import { Domanda } from '../model/domanda.model';
import { ApplicationService } from '../../service/application.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { DomandaOutcome } from '../model/domanda-outcome.model';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
//import { default as _rollupMoment } from 'moment';

//const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class ApplicationFormComponent implements OnInit {
  [x: string]: any;
  buGroups = BuGroups;
  applicationForm: FormGroup;
  startDate = moment([1970, 0, 1]);
  minDate = moment([1930, 0, 1]);
  maxDate = moment([2004, 0, 1]);
  personalDataValidationMessages = null;
  shouldShowPinBox = false;
  civilLicenseSelected: boolean = false;
  vvfLicenseSelected: boolean = false;
  submitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cfCheckService: CfCheckService,
    private applicationService: ApplicationService,
    private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.applicationForm = this.fb.group({
      personalData: this.fb.group({
        fiscalCode: ['', [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16)
        ]],
        firstName: ['', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]],
        lastName: ['', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]],
        birthDate: ['', Validators.required],
        pin: ['', [
          Validators.minLength(6),
          Validators.maxLength(6)
        ]]
      },
        {
          validator: (g: FormGroup) => {
            return this.syncValidation(g);
          },
          asyncValidator: (g: FormGroup) => {
            return this.asyncValidation(g);
          }
        }),
      email: this.fb.group({
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        emailConfirmation: ''
      }, {
          validator: (g: FormGroup) => {
            return this.emailMatch(g);
          }
        }),
      workInfo: this.fb.group({
        workedDays: [0, [
          Validators.min(1),
          Validators.max(9999),
          Validators.pattern('^[0-9]{1,4}$')
        ]],
        businessUnits: ['', [
          Validators.required
        ]]
      }),
      licenseInfo: this.fb.group({
        category: ['', [
          Validators.required
        ]],
        number: ['', [
          Validators.required
        ]],
        releasedBy: ['', [
          Validators.required
        ]],
        releaseDate: ['', [
          Validators.required
        ]],
        validUntil: ['', [
          Validators.required
        ]],
      }, {
          validator: (g: FormGroup) => {
            return this.licenseDatesAreValid(g);
          }
        }),
      gdprCompliancy: this.fb.group({
        acceptance: [false, Validators.requiredTrue]
      })
    })
  }

  get fiscalCode() {
    return this.applicationForm.get('personalData.fiscalCode');
  }

  get pin() {
    return this.applicationForm.get('personalData.pin');
  }

  get firstName() {
    return this.applicationForm.get('personalData.firstName');
  }

  get lastName() {
    return this.applicationForm.get('personalData.lastName');
  }

  get birthDate() {
    return this.applicationForm.get('personalData.birthDate');
  }

  get email() {
    return this.applicationForm.get('email.email');
  }

  get emailConfirmation() {
    return this.applicationForm.get('email.emailConfirmation');
  }

  get workedDays() {
    return this.applicationForm.get('workInfo.workedDays');
  }

  get businessUnits() {
    return this.applicationForm.get('workInfo.businessUnits');
  }

  get license() {
    return this.applicationForm.get('licenseInfo.license');
  }

  get category() {
    return this.applicationForm.get('licenseInfo.category');
  }

  get number() {
    return this.applicationForm.get('licenseInfo.number');
  }

  get releasedBy() {
    return this.applicationForm.get('licenseInfo.releasedBy');
  }

  get releaseDate() {
    return this.applicationForm.get('licenseInfo.releaseDate');
  }

  get validUntil() {
    return this.applicationForm.get('licenseInfo.validUntil');
  }

  get acceptance() {
    return this.applicationForm.get('gdprCompliancy.acceptance');
  }

  selectLicense(event) {
    this.civilLicenseSelected = event.value == "CIV";
    this.vvfLicenseSelected = event.value == "VVF";

    if (this.vvfLicenseSelected)
      this.applicationForm.get("licenseInfo.releasedBy").setValue("D.C. per la Formazione");
    else
      this.applicationForm.get("licenseInfo.releasedBy").setValue(null);
  }

  emailMatch(g: FormGroup) {
    let emailValue = g.get('email').value;
    let emailConfirmationValue = g.get('emailConfirmation').value;
    if (emailValue !== emailConfirmationValue)
      g.get('emailConfirmation').setErrors({ mismatch: true });

    return null;
  }

  licenseDatesAreValid(g: FormGroup) {
    let releaseDateValue = g.get('releaseDate').value;
    let validUntilDateValue = g.get('validUntil').value;
    if (releaseDateValue >= validUntilDateValue)
      g.get('validUntil').setErrors({ invalid: true });

    return null;
  }

  syncValidation(g: FormGroup) {
    return null;
  }

  asyncValidation(g: FormGroup) {
    let a = new Anagrafica(
      g.value.fiscalCode,
      g.value.firstName,
      g.value.lastName,
      g.value.birthDate.format("YYYY/MM/DD"),
      g.value.pin);

    return this.cfCheckService.cfCheck(a)
      .pipe(delay(500))
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .pipe(map(outcome => {

        if (outcome.results.length == 0)
          this.personalDataValidationMessages = null;
        else
          this.personalDataValidationMessages = outcome.results
            .map(r => {
              return {
                type: r.type,
                msg: r.message
              }
            });

        if (outcome.shouldTypePin)
          this.shouldShowPinBox = true;

        if (outcome.canSubmit)
          return null;
        else
          return { "cfError": true };
      }));
  }


  sendForm() {

    let licenseSelected = this.vvfLicenseSelected ? "VVF" : this.civilLicenseSelected ? "civile" : "sconosciuta";

    let drivingLicense =
      "Patente " + licenseSelected + " " +
      "di categoria " + this.category.value + " " +
      "n. " + this.number.value + " " +
      "rilasciata il " + this.releaseDate.value.format("DD/MM/YYYY") + " " +
      "valida fino al " + this.validUntil.value.format("DD/MM/YYYY");

    let a = new Domanda(
      this.fiscalCode.value,
      this.firstName.value,
      this.lastName.value,
      this.birthDate.value.format("YYYY/MM/DD"),
      this.email.value,
      this.businessUnits.value,
      this.workedDays.value,
      drivingLicense,
      this.pin.value
    );

    this.submitting = true;

    return this.applicationService.inserisciDomanda(a)
      .subscribe(outcome => {
        if (outcome.messagesToTheUser.length == 0)
          this.personalDataValidationMessages = null;
        else
          this.personalDataValidationMessages = outcome.messagesToTheUser
            .map(r => {
              return {
                type: r.type,
                msg: r.message
              }
            });

        if (outcome.submissionOk)
          this.router.navigate(['/submission-result']);

        this.submitting = false;
      });
  }
}