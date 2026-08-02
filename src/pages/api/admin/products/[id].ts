import type { NextApiRequest, NextApiResponse } from 'next';
import { getProductByIdOrSlug, updateProduct, deleteProduct } from '../../../../lib/products';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ success: false, message: 'Product ID is required.' });
  }

  if (req.method === 'GET') {
    try {
      const product = await getProductByIdOrSlug(id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found.' });
      }
      return res.status(200).json({ success: true, product });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message });
    }
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    try {
      const updated = await updateProduct(id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Product not found for update.' });
      }
      return res.status(200).json({ success: true, message: 'Product updated successfully.', product: updated });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const success = await deleteProduct(id);
      if (!success) {
        return res.status(400).json({ success: false, message: 'Failed to delete product.' });
      }
      return res.status(200).json({ success: true, message: 'Product drop deleted successfully.' });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message });
    }
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
