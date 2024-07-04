import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { CurrenciesService } from '../../shared/services/currencies.service';
import { ICurrency } from '../../shared/interfaces/currency.interface';
import { CurrencyEnum } from '../../shared/enums/currency.enum';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrl: './currency-form.component.scss',
})
export class CurrencyFormComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;

  public currencies: ICurrency[] = [];

  public baseCurrency: CurrencyEnum = CurrencyEnum.USD;

  public currencyToConvertTo: CurrencyEnum = CurrencyEnum.RUB;

  private currencyRate: number;

  private destroyed$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private currenciesService: CurrenciesService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getCurrenciesData();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  getCurrenciesData(baseCurrencyValue?): void {
    this.currenciesService
      .getCurrencies(this.baseCurrency)
      .subscribe((data) => {
        this.currencyRate = data[this.baseCurrency][this.currencyToConvertTo];
        this.initFormValues(baseCurrencyValue);
      });
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      fromCurrency: ['', []],
      fromAmount: ['', []],
      toCurrency: ['', []],
      toAmount: ['', []],
    });
  }

  public updateCurrencyRate(currencyName: any, dropdownName: string): void {
    const { controls } = this.formGroup;

    switch (dropdownName) {
      case 'fromCurrency':
        this.baseCurrency = currencyName;
        this.getCurrenciesData();
        break;
      case 'toCurrency':
        this.currencyToConvertTo = currencyName;
        const baseCurrencyValue = controls['fromAmount'].value;
        this.getCurrenciesData(baseCurrencyValue);
        break;
      default:
        break;
    }
  }

  public updateCurrencyValues(event: any, inputName: string): void {
    const { controls } = this.formGroup;
    const value = event.target.value;
    switch (inputName) {
      case 'fromAmount':
        const rate = +value * this.currencyRate;
        controls['toAmount'].setValue(Number(rate.toFixed(4)));
        break;
      case 'toAmount':
        const newFromAmountValue = +value / this.currencyRate;
        controls['fromAmount'].setValue(Number(newFromAmountValue.toFixed(4)));
        break;
      default:
        break;
    }
  }

  public swapCurrencies(): void {
    const { controls } = this.formGroup;
    const newBaseValue = controls['fromAmount'].value;

    const baseCurrencybuffer = this.baseCurrency;
    this.baseCurrency = this.currencyToConvertTo;
    this.currencyToConvertTo = baseCurrencybuffer;

    this.getCurrenciesData(newBaseValue);
  }

  private initFormValues(baseCurrencyValue = 1) {
    const { controls } = this.formGroup;

    const rate = +baseCurrencyValue * this.currencyRate;

    console.log(baseCurrencyValue);
    controls['fromAmount'].setValue(Number(baseCurrencyValue).toFixed(4));
    controls['toAmount'].setValue(Number(rate.toFixed(4)));
  }
}
