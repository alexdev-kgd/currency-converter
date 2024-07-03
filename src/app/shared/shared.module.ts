import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyDropdownComponent } from './components/currency-dropdown/currency-dropdown.component';
import { CurrencyInputComponent } from './components/currency-input/currency-input.component';

const modules = [
  CommonModule,
  FormsModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [CurrencyDropdownComponent, CurrencyInputComponent],
  imports: [...modules],
  exports: [...modules, CurrencyDropdownComponent, CurrencyInputComponent],
})
export class SharedModule {}
