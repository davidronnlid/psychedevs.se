export interface ProductProps {
  id: number;
  PRICE_ID: string;
  title: string;
  description: string;
  price: number;
  payment_options: Array<string>;
}
