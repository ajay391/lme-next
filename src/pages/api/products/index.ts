import type { NextApiRequest, NextApiResponse } from 'next';
import { getProducts } from '../../../lib/products';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { category, search, featured } = req.query;

    const products = await getProducts({
      category: typeof category === 'string' ? category : undefined,
      search: typeof search === 'string' ? search : undefined,
      featuredOnly: featured === 'true',
      includeInactive: false,
    });

    return res.status(200).json({
      success: true,
      products,
      count: products.length,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch storefront products.',
      error: err?.message,
    });
  }
}
