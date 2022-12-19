import { NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { v4 as uuid } from 'uuid';
import { CustomOrderReq } from '../../../types/Request';
import client from '../../../lib/prismadb';

export default async function handler(
  req: CustomOrderReq,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { order, paymentMethod } = req.body;

    if (!paymentMethod || order.length === 0) {
      res.status(406).json({ message: 'Not enough data provided' });
      return;
    }

    try {
      const session = await getSession({ req });
      const orderId = uuid();
      const orderComplete = order.map(
        ({ category, imageId, imageUrl, name, price, ...rest }) => ({
          ...rest,
          paymentMethod,
          userId: session?.user.email!,
          orderId,
        })
      );

      await client.userOrder.createMany({
        data: orderComplete,
      });

      res.status(200).json({ message: 'Order sent' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }
}
