import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const isWhitespace = value.trim().length === 0;
    const isValidLength = value.length >= minLength;
    const isValid = !isWhitespace && isValidLength;
    return isValid
      ? null
      : {
          minLength: { requiredLength: minLength, actualLength: value.length },
        };
  };
}
