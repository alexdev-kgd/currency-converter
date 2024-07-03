import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.scss',
})
export class CurrencyInputComponent {
  @Input() label: string;
  @Input() formControlName: string;
  @Input() formGroup: FormGroup;
}
