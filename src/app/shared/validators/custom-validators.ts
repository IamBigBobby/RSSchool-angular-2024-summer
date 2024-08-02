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
          minLength: true,
        };
  };
}

export function mixedCaseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const isValid = hasUpperCase && hasLowerCase;

    return isValid
      ? null
      : {
          mixedCase: true,
        };
  };
}
