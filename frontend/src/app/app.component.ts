import { Component } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';


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
  anagFormGroup: FormGroup;
  servFormGroup: FormGroup;
  patFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.anagFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.servFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.min(0)]
    });
    this.patFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }
 
  numberDaysFormControl = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  repeatEmailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
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
