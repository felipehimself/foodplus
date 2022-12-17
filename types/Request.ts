import { NextApiRequest } from "next";
import { IUserOrder } from "./Order";

export interface CustomOrderReq extends NextApiRequest {
  body: {
    order: IUserOrder[];
    paymentMethod: string;
  };
}