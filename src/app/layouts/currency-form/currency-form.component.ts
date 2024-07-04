import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { CurrenciesService } from '../../shared/services/currencies.service';
import { CurrencyEnum } from '../../shared/enums/currency.enum';
import { ValidateSpaces } from '../../shared/validations/space-validation';
import { ValidateNumbers } from '../../shared/validations/number-validation';
import { fixedNumber } from '../../shared/helpers/fixedNumber.helper';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrl: './currency-form.component.scss',
})
export class CurrencyFormComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;

  public baseCurrency: CurrencyEnum = CurrencyEnum.USD;

  public currencyToConvertTo: CurrencyEnum = CurrencyEnum.RUB;

  private currencyRate: number;

  private destroyed$ = new Subject<void>();

  get fromAmount() {
    return this.formGroup.get('fromAmount');
  }
  get toAmount() {
    return this.formGroup.get('toAmount');
  }

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
      .pipe(
        catchError((e) => EMPTY),
        takeUntil(this.destroyed$)
      )
      .subscribe((data) => {
        this.currencyRate = data[this.baseCurrency][this.currencyToConvertTo];
        this.initFormValues(baseCurrencyValue);
      });
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      fromAmount: ['', [Validators.required, ValidateSpaces, ValidateNumbers]],
      toAmount: ['', [Validators.required, ValidateSpaces, ValidateNumbers]],
    });
  }

  public getErrorMessage(): string {
    const { controls } = this.formGroup;

    if (
      controls['fromAmount'].hasError('hasSpaces') ||
      controls['toAmount'].hasError('hasSpaces')
    ) {
      return 'Fields should not have spaces';
    } else if (
      controls['fromAmount'].hasError('notANumber') ||
      controls['toAmount'].hasError('notANumber')
    ) {
      return 'Fields must contain numbers only';
    } else if (
      controls['fromAmount'].hasError('required') ||
      controls['toAmount'].hasError('required')
    ) {
      return 'Fields must contain at least 1 digit';
    }

    return '';
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
    if (this.formGroup.valid) {
      const { controls } = this.formGroup;
      const value = event.target.value;
      switch (inputName) {
        case 'fromAmount':
          const rate = +value * this.currencyRate;
          controls['toAmount'].setValue(fixedNumber(rate));
          break;
        case 'toAmount':
          const newFromAmountValue = +value / this.currencyRate;
          controls['fromAmount'].setValue(fixedNumber(newFromAmountValue));
          break;
        default:
          break;
      }
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

    controls['fromAmount'].setValue(fixedNumber(baseCurrencyValue));
    controls['toAmount'].setValue(fixedNumber(rate));
  }
}
