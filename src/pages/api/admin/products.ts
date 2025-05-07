// pages/api/admin/products.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import Product from '../../../models/Product';
import User from '../../../models/User';
import dbConnect from '../../../libs/mongo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (req.method === 'GET') {
      // Fetch all products
      const products = await Product.find();
      return res.status(200).json({ products });
    }

    if (req.method === 'POST') {
      const { name, description, price, category, imageUrl, stock } = req.body;

      // Validate input
      if (!name || !description || !price || !category || !imageUrl) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Create a new product
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        imageUrl,
        stock: Number(stock) || 0, 
      });

      await newProduct.save();
      return res.status(201).json({ message: 'Product added successfully', product: newProduct });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    console.error('Error handling request:', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
