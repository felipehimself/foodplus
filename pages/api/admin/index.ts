import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import client from '../../../lib/prismadb';
import { authOptions } from '../auth/[...nextauth]';
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

interface CustomNextApiRequest extends NextApiRequest {
  query: {
    productId: string;
    imageId: string;
  };
}

export default async function handler(
  req: CustomNextApiRequest,
  res: NextApiResponse
) {

  const session = await unstable_getServerSession(req, res, authOptions);

  if(!session || !session.user.role){
    res.status(401).json({ message: 'Unauthorized' });
    return
  }

  if (req.method === 'POST') {
    console.log(session)

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

  if (req.method === 'PUT') {
    const { name, price, imageId, imageUrl, category, productId } = req.body;

    if (!category || !name || !price || !imageId || !imageUrl || !productId) {
      res.status(406).json({ message: 'Not enough data provided' });
      return;
    }

    try {

      const originalProd = await client.product.findUnique({
        where: {
          productId: productId
        }
      })

      if (originalProd?.imageId === imageId) {
        await client.product.update({
          where: {
            productId: productId
          },
          data: {
            name, price, category, productId
          }
        })
        res.status(200).json({ message: 'Product updated' });
      } 
      
      else {
        await await cloudinary.uploader.destroy(originalProd?.imageId);
        await client.product.update({
          where: {
            productId: productId
          },
          data: {
            name, price, imageId, imageUrl, category, productId
          }
        })
        res.status(200).json({ message: 'Product updated' });

      }

    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error });
    }
  }
}
