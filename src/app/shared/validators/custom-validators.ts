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

export function lettersAndNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const hasLetters = /[a-zA-Z]/.test(value);
    const hasNumbers = /[0-9]/.test(value);
    const isValid = hasLetters && hasNumbers;

    return isValid
      ? null
      : {
          lettersAndNumbers: true,
        };
  };
}

export function specialCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const hasSpecialChar = /[!@#$%^&*()+\-={};:'",.<>/?\\|`~]/.test(value);
    const isValid = hasSpecialChar;

    return isValid
      ? null
      : {
          specialCharacter: true,
        };
  };
}

export function noFutureDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const today = new Date();
    const selectedDate = new Date(control.value);

    if (selectedDate > today) {
      return { futureDate: true };
    }

    return null;
  };
}
