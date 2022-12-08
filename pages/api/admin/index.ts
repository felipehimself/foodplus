import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../lib/prismadb';
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

interface CustomNextApiRequest extends NextApiRequest {
  query: {
    productId: string;
    imageId: string;
  };
}

export default async function handler(req: CustomNextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, price, imageId, imageUrl, category } = req.body;

    if (!category || !name || !price || !imageId || !imageUrl) {
      res.status(406).json({ message: 'Not enough data provided' });
      return;
    }

    try {
      await client.product.create({
        data: { name, price, imageId, imageUrl, category },
      });
      res.status(201).json({ message: 'created' });
    } catch (error) {
      console.log(error);

      res.status(400).json({ message: error });
    }
  }

  if (req.method === 'DELETE') {
    const { productId, imageId } = req.query;

    if (!productId || !imageId) {
      res.status(406).json({ message: 'Not enough data provided' });
      return;
    }

    try {
      await client.product.delete({
        where: {
          productId: productId,
        },
      });
      await cloudinary.uploader.destroy(imageId);
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      res.status(400).json({ message: 'Server error' });
    }
  }
}
