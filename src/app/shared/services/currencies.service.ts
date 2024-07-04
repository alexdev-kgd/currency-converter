import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurrency } from '../interfaces/currency.interface';
import { CurrencyEnum } from '../enums/currency.enum';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  constructor(private http: HttpClient) {}

  getCurrencies(base: CurrencyEnum): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`
    );
  }
}
