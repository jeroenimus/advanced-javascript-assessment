import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appNumberValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NumberValidatorDirective, multi: true }]
})
export class NumberValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return numberValidator()(control);
  }
}

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const notNumeric = control.value === null || control.value === '' || isNaN(control.value);
    return notNumeric ? { notNumeric: {value: control.value} } : null;
  };
}
