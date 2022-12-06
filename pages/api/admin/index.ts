import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, price, imageId, imageUrl, category } = req.body;

  if (!category || !name || !price || !imageId || !imageUrl ) {
    res.status(406).json({ message: 'Not enough data provided' });
    return;
  }

  if (req.method === 'POST') {
    
    try {
      await client.product.create({data: {name, price, imageId, imageUrl, category}})
      res.status(201).json({ message: 'created' });
    } catch (error) {
      console.log(error);

      res.status(400).json({ message: error });
    }
  }
}
