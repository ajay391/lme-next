import type { NextApiRequest, NextApiResponse } from 'next';
import { getProductByIdOrSlug } from '../../../lib/products';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ success: false, message: 'Product ID or slug is required.' });
    }

    const product = await getProductByIdOrSlug(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch product details.',
      error: err?.message,
    });
  }
}
