import { IOrder } from './Order';

export interface ICart {
  totalAmt: number;
  order: IOrder[];
}
