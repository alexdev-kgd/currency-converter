import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ValidateNumbers(
  control: AbstractControl
): ValidationErrors | null {
  const regex = /^\d+(\.\d+)?$/;

  if (control.value && !regex.test(control.value)) {
    return { notANumber: true }; // invalid
  }
  return null; // valid
}
