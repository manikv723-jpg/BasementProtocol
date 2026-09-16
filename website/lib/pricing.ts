import { PRICE, USD_PRICE } from './business';

export type RegionalPrice = {
  currency: 'INR' | 'USD'; amount: number; price: number; label: string; region: string;
};

export function priceForCountry(country: string | null): RegionalPrice {
  const india = country?.toUpperCase() === 'IN';
  const price = india ? PRICE : USD_PRICE;
  return {
    currency: india ? 'INR' : 'USD', amount: price * 100, price,
    label: india ? `₹${price.toLocaleString('en-IN')}` : `US$${price}`,
    region: india ? 'India' : 'International',
  };
}
