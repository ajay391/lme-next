import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import connect from '../../../libs/mongo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, phone, password } = req.body;

    // Validate the input
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    await connect(); // Ensure the database connection

    // Check if email or phone already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or phone already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user (always with role: "user")
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: 'user', // secure default
    });

    await newUser.save();

    res.status(200).json({ success: 'User registered successfully' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
