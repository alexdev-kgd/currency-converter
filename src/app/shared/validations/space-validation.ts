import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ValidateSpaces(
  control: AbstractControl
): ValidationErrors | null {
  const regex = /[ \t]/;

  if (control.value && regex.test(control.value)) {
    return { hasSpaces: true }; // invalid
  }
  return null; // valid
}
2;
