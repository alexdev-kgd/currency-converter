import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CURRENCIES } from '../../constants/currency.constant';
import { CurrencyEnum } from '../../enums/currency.enum';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-currency-dropdown',
  templateUrl: './currency-dropdown.component.html',
  styleUrl: './currency-dropdown.component.scss',
})
export class CurrencyDropdownComponent implements OnInit {
  @Input() dropdownType: string;
  @Input() selectedCurrency: CurrencyEnum;
  @Output() onDropdownChange = new EventEmitter<string>();

  public currencies: string[];

  ngOnInit(): void {
    this.currencies = CURRENCIES;
  }

  public onChange(event?: MatSelectChange): void {
    if (event && event.value !== null) this.onDropdownChange.emit(event.value);
  }
}
