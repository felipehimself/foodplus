import { IProduct } from './Product';

export interface IOrder extends IProduct {
  qty: number;
}

