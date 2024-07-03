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

  private destroyed$ = new Subject<void>();

  public currencies: ICurrency[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private currenciesService: CurrenciesService
  ) {
    this.currenciesService.getCurrencies().subscribe((data) => {
      console.log(data);
      this.currencies = data;
      // this.currencies[CurrencyEnum.RUB][]
    });
  }

  ngOnInit(): void {
    this.buildForm();
    this.onCurrencyChange();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      fromCurrency: ['', [Validators.required]],
      fromAmount: ['', [Validators.required]],
      toCurrency: ['', [Validators.required]],
      toAmount: ['', [Validators.required]],
    });
  }

  // private setFormValue(currency) {
  //   const { controls } = this.formGroup;

  //   controls.fromCurrency.setValue(currency.base);
  // }

  private onCurrencyChange(): void {
    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroyed$), debounceTime(300))
      .subscribe((params) => {
        this.processCurrencyCalculation();
      });
  }

  processCurrencyCalculation() {
    if (this.formGroup.valid) {
      this.formGroup.disable();
    }

    const fromCurrencyValue = this.formGroup.get('fromCurrency')?.value;
    const fromAmountValue = this.formGroup.get('fromAmount')?.value;
    const toCurrencyValue = this.formGroup.get('toCurrency')?.value;
    const toAmountValue = this.formGroup.get('toAmount')?.value;

    // const rate = this.currencies.find(
    //   (currency) => currency.base === fromCurrencyValue
    // )?.rates[toCurrencyValue];

    // if (rate) {
    //   const toAmountValue = fromAmountValue * rate;

    //   this.formGroup.get('toAmount')?.setValue(toAmountValue.toFixed(4));
    // }
  }
}
