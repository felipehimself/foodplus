import { IProductFull } from './Product';

export interface IOrder extends IProductFull {
  qty: number;
}

