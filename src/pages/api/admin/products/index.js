import { getProducts, createProduct } from '../../../../lib/products';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { category, search } = req.query;
      const products = await getProducts({
        category: typeof category === 'string' ? category : undefined,
        search: typeof search === 'string' ? search : undefined,
        includeInactive: true, // Admin sees active & draft products
      });

      return res.status(200).json({ success: true, products });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message || 'Failed to fetch admin products.' });
    }
  }

  if (req.method === 'POST') {
    try {
      const payload = req.body;
      const product = await createProduct(payload);

      return res.status(201).json({
        success: true,
        message: 'Product drop created successfully',
        product,
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message || 'Failed to create product drop.' });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
