// pages/api/admin/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!); // Verify JWT
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' }); // Admin-only access
    }

    // Proceed with admin-specific logic (e.g., fetching users)
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
