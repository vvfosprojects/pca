import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { of as observableOf, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CfCheckService } from '../../service/cf-check.service';
import { Anagrafica } from '../model/anagrafica.model';
import { CfCheckOutcome } from '../model/cf-check-outcome.model';
import { BUGROUPS } from './bu-groups';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  buGroups = BUGROUPS;
  applicationForm: FormGroup;
  startDate = new Date(1970, 0, 1);
  minDate = new Date(1928, 0, 1);
  maxDate = new Date(2002, 0, 1);
  personalDataValidationMessages = null;
  shouldShowPinBox = false;

  constructor(
    private fb: FormBuilder,
    private cfCheckService: CfCheckService) {
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

  emailMatch(g: FormGroup) {
    let emailValue = g.get('email').value;
    let emailConfirmationValue = g.get('emailConfirmation').value;
    if (emailValue !== emailConfirmationValue)
      g.get('emailConfirmation').setErrors({ mismatch: true });

    return null;
  }

  syncValidation(g: FormGroup) {
    return null;
  }

  asyncValidation(g: FormGroup) {
    let pd = this.applicationForm.value.personalData;
    let a = new Anagrafica(
      pd.fiscalCode,
      pd.firstName,
      pd.lastName,
      pd.birthDate,
      pd.pin);

    return this.cfCheckService.cfCheck(a)
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
        this.shouldShowPinBox = outcome.shouldTypePin;

        if (outcome.canSubmit)
          return null;
        else
          return { "cfError": true };
      }));
  }
}