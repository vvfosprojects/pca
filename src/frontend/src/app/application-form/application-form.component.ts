import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { of as observableOf, Observable, timer } from 'rxjs';
import { map, filter, delay, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { CfCheckService } from '../../service/cf-check.service';
import { Anagrafica } from '../model/anagrafica.model';
import { CfCheckOutcome } from '../model/cf-check-outcome.model';
import { BUGROUPS } from './bu-groups';
import { Domanda } from '../model/domanda.model';
import { ApplicationService } from '../../service/application.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { DomandaOutcome } from '../model/domanda-outcome.model';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  [x: string]: any;
  buGroups = BUGROUPS;
  applicationForm: FormGroup;
  startDate = new Date(1970, 0, 1);
  minDate = new Date(1928, 0, 1);
  maxDate = new Date(2002, 0, 1);
  personalDataValidationMessages = null;
  shouldShowPinBox = false;
  civilLicenseSelected: boolean = false;
  vvfLicenseSelected: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cfCheckService: CfCheckService,
    private applicationService: ApplicationService,
    private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  onChange($event) {
    console.log($event);
  }

  sendAnag() {
    console.log(this.applicationForm.value.personalData);
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
      g.value.birthDate,
      g.value.pin);

    console.log("Going to check", a);

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
      "rilasciata il " + this.releaseDate.value + " " +
      "valida fino al " + this.validUntil.value;

    let a = new Domanda(
      this.fiscalCode.value,
      this.firstName.value,
      this.lastName.value,
      this.birthDate.value,
      this.email.value,
      this.businessUnits.value,
      this.workedDays.value,
      drivingLicense,
      this.pin.value
    );

    return this.applicationService.inserisciDomanda(a)
      .subscribe(outcome => {
        console.log("Service returned", outcome);

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
      });
  }
}