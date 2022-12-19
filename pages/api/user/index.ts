import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../lib/prismadb';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (req.method === 'POST') {
    const { street, number, city, state } = req.body;

    if (!street || !city || !state) {
      res.status(406).json({ message: 'Not enough data provided' });
      return;
    }

    try {

      
      await client.address.create({
        data: {
          userId: session?.user.email!,
          street,
          number,
          city,
          state,
          
        },
      });
      res.status(200).json({ message: 'saved' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }

  if (req.method === 'PUT') {
    const { street, number, city, state } = req.body;

    if (!street || !city || !state) {
      res.status(406).json({ message: 'Not enough data provided' });
      return;
    }

    try {
      
      await client.address.update({
        where: {
          userId: session?.user.email!,
        },
        data: {
          street,
          number,
          city,
          state,
        }
      })
    
      res.status(200).json({ message: 'saved' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }
}
