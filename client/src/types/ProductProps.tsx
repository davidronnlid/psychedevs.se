export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  payment_options: Array<string>;
}
