export interface ICurrency {
  date: string;
  base: string;
  rates: { [key: string]: number };
}
