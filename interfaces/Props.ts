import { MouseEventHandler } from 'react';
import { ICart } from './Cart';
import { IUserOrders } from './Order';
import { IAddress, IUserData } from './User';

export interface IChildren {
  children: React.ReactNode;
}

export interface IAdminHeading {
  title: string;
  width?: string;
}

export interface IButton {
  title: string;
  className?: string;
  onClick: Function;
  type?: 'submit' | 'button';
  disabled?: boolean;
}

export interface IAccount {
  userData: IUserData & { address: IAddress | null };
  groupedOrders: IUserOrders[];
}

export interface ICartProps {
  cart: ICart;
  handleCancel: MouseEventHandler<HTMLElement>;
  handleRemoveFromCart: Function;
  handleCheckout: MouseEventHandler<HTMLElement>;
  handleCloseCart?: MouseEventHandler<HTMLElement>;
  showCart?: Boolean;
}
