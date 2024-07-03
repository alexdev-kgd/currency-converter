import { Component, Input, OnInit } from '@angular/core';
import { CURRENCIES } from '../../constants/currency.constant';
import { CurrencyEnum } from '../../enums/currency.enum';

@Component({
  selector: 'app-currency-dropdown',
  templateUrl: './currency-dropdown.component.html',
  styleUrl: './currency-dropdown.component.scss',
})
export class CurrencyDropdownComponent implements OnInit {
  @Input() dropdownType: string;

  public currencies: string[];
  public selectedCurrency: string;

  ngOnInit(): void {
    this.currencies = CURRENCIES;
    this.selectedCurrency =
      this.dropdownType === 'fromCurrency'
        ? CurrencyEnum.USD
        : CurrencyEnum.RUB;
  }
}
