export enum PricingType {
  Fixed = 'fixed_price',
  None = 'no_price'
}

export interface LocalPrice {
  amount: string;
  currency: string;
}