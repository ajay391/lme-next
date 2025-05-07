import dbConnect from '@/libs/mongo';
import Product from '@/models/Product';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  await dbConnect();

  try {
    const { name, price, description, imageUrl, category } = req.body;
    const product = await Product.create({ name, price, description, imageUrl, category });
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', details: err });
  }
}
