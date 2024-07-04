import { CurrencyEnum } from '../enums/currency.enum';

export type CurrencyData = {
  [key in CurrencyEnum]: { [key: string]: string };
} & { date: string };
