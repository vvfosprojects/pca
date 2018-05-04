import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isChecked = Boolean();
  isCheckedPrivacy = Boolean();
  sedeControl = new FormControl();

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
