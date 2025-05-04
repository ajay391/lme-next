import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

const otpStore: Record<string, string> = {};

// Get Twilio credentials from env
const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER!;
const client = twilio(accountSid, authToken);


console.log('SID:', accountSid);
console.log('TOKEN:', authToken);
console.log('PHONE:', twilioPhone);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: 'Phone number required' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[phone] = otp;

    try {
      // Send SMS using Twilio
      const message = await client.messages.create({
        body: `Your OTP is: ${otp}`,
        from: twilioPhone,
        to: phone, // Must be in E.164 format, e.g., +91XXXXXXXXXX
      });

      console.log(`OTP sent to ${phone}: ${otp}`);
      return res.status(200).json({ success: true });
    } catch (error: any) {
      console.error('Twilio Error:', {
        message: error?.message,
        code: error?.code,
        moreInfo: error?.moreInfo,
      });

      return res.status(500).json({ error: error?.message || 'Failed to send OTP' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export { otpStore };
