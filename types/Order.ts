import { IProduct } from './Product';

export interface IOrder extends IProduct {
  quantity: number;
}

export interface IUserOrder extends IOrder {
  userId:string	
  orderId:string
  productId:string	
  paymentMethod: string
}

export interface IUserOrders extends IUserOrder {
  createdAt: Date
}

