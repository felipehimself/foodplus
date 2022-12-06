import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, name, price, imageId, imageUrl } = req.body;

  if (!type || !name || !price || !imageId || !imageUrl ) {
    res.status(406).json({ message: 'Not enough data provided' });
    return;
  }

  if (req.method === 'POST') {
    
    try {

      const data = {
        data: {
          name: name,
          price: price,
          imageUrl: imageUrl,
          imageId: imageId,
        },
      };
      switch (type.toLowerCase()) {
        case 'sauce':
          await client.sauce.create(data);
          break;

        case 'veggie':
          await client.veggie.create(data);
          break;

        case 'cheese':
          await client.cheese.create(data);
          break;

        case 'crunch':
          await client.crunch.create(data);
          break;

        case 'extra':
          await client.extra.create(data);
          break;
      }
      res.status(201).json({ message: 'created' });
    } catch (error) {
      console.log(error);

      res.status(400).json({ message: error });
    }
  }
}
