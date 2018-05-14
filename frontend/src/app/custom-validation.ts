import { FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';



/**
 * Custom validator functions for reactive form validation
 */
export class CustomValidators {
	/**
	 * Validates that child controls in the form group are equal
	 */
	static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
		const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
		const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value === formGroup.get(firstControlName).value);
		return isValid ? null : { childrenNotEqual: true };
	}
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		return control.parent.invalid && control.touched;
	}
}

/**
* Collection of reusable RegExps
*/
export const regExps: { [key: string]: RegExp } = {
   password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
};

/**
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
	codFis: 'Codice fiscale deve contenere 16 caratteri',
	nome: 'Nome può contenere al massimo 40 caratteri',
	cognome: 'Cognome può contenere al massimo 40 caratteri',
	email: 'Email deve essere un indirizzo valido (username@domain)',
	confirmEmail: 'Indirizzo email deve coincidere'
};
