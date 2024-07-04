import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyEnum } from '../enums/currency.enum';
import { CurrencyData } from '../interfaces/currency.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  constructor(private http: HttpClient) {}

  getCurrencies(base: CurrencyEnum): Observable<CurrencyData[]> {
    return this.http.get<CurrencyData[]>(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`
    );
  }
}
