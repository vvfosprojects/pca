import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { of as observableOf, Observable } from 'rxjs';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  applicationForm: FormGroup;
  startDate = new Date(1970, 0, 1);
  minDate = new Date(1928, 0, 1);
  maxDate = new Date(2002, 0, 1);

  buGroups = [
    {
      name: 'Lazio',
      bu: [
        { value: 'DIR-LAZ', viewValue: 'Dir. Reg. Lazio' },
        { value: 'COM-RM', viewValue: 'Com. Prov. Roma' },
        { value: 'COM-RT', viewValue: 'Com. Prov. Rieti' },
        { value: 'COM-VT', viewValue: 'Com. Prov. Viterbo' },
        { value: 'COM-LT', viewValue: 'Com. Prov. Latina' },
        { value: 'COM-FR', viewValue: 'Com. Prov. Frosinone' }
      ]
    },
    {
      name: 'Campania',
      bu: [
        { value: 'DIR-CAM', viewValue: 'Dir. Reg. Campania' },
        { value: 'COM-NA', viewValue: 'Com. Prov. Napoli' },
        { value: 'COM-CE', viewValue: 'Com. Prov. Caserta' },
        { value: 'COM-AV', viewValue: 'Com. Prov. Avellino' },
        { value: 'COM-SA', viewValue: 'Com. Prov. Salerno' },
        { value: 'COM-BN', viewValue: 'Com. Prov. Benevento' }
      ]
    }
  ];

  constructor(private fb: FormBuilder) {
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
    },
      {
        validator: (g: FormGroup) => {
          return this.syncValidation(g);
        },
        asyncValidator: (g: FormGroup) => {
          return this.asyncValidation(g);
        }
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
    return observableOf(null);
  }
}