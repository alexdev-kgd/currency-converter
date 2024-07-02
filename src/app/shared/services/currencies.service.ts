import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<any> {
    return this.http.get<any>(
      'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=ef5e93a70a504e87ac2a32c84641dfea'
    );
  }
}
