import { TestBed } from '@angular/core/testing';

import { CurrencyValidationService } from './currency-validation.service';

describe('CurrencyValidationService', () => {
  let service: CurrencyValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
