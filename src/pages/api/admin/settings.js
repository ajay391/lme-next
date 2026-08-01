// Admin Store Settings API Route
let STORE_SETTINGS = {
  shipping_flat_fee: 99,
  free_shipping_threshold: 1999,
  announcement_bar_text: "FREE EXPRESS SHIPPING NATIONWIDE ON ORDERS ABOVE ₹1,999",
  support_email: "support@lme.com",
  support_phone: "+91 9876543210",
};

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ settings: STORE_SETTINGS });
  }

  if (req.method === "PUT" || req.method === "POST") {
    STORE_SETTINGS = { ...STORE_SETTINGS, ...req.body };
    return res.status(200).json({ message: "Store settings updated successfully", settings: STORE_SETTINGS });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
