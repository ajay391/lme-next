import type { NextApiRequest, NextApiResponse } from 'next';
import { otpStore } from './send-otp';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ error: 'Missing phone or OTP' });
    }

    if (otpStore[phone] === otp) {
      delete otpStore[phone]; // OTP used
      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ success: false, message: 'Invalid OTP' });
  }

  res.status(405).end();
}
