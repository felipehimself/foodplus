import { IProduct } from './Product';

export interface IOrder extends IProduct {
  quantity: number;
}

export interface IUserOrder extends IOrder {
  userId: string;
  orderId: string;
  productId: string;
  paymentMethod: string;
  createdAt: Date;
}

export interface IItems {
  quantity: number;
  name: string;
  price: number;
  totalAmt: number;
  productId: string;
  imageUrl: string;
}

export interface IUserOrders {
  orderId: string;
  createdAt: Date;
  paymentMethod: string;
  items: IItems[];
}
