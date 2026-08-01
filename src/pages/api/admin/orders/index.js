// Admin Orders API Route
const INITIAL_ORDERS = [
  {
    id: "ORD-9842",
    customer_name: "Aarav Sharma",
    customer_email: "aarav@gmail.com",
    customer_phone: "9876543210",
    date: "2026-08-01",
    total: 2998,
    status: "Processing",
    payment_status: "Paid",
    shipping_address: "Flat 402, Skyline Towers, Cyber City, Gurugram, Haryana",
    items: [
      { name: "EVERYDAY REBEL", size: "L", qty: 1, price: 999 },
      { name: "LIMITLESS SPIRIT", size: "XL", qty: 1, price: 1999 },
    ],
  },
  {
    id: "ORD-9841",
    customer_name: "Rohan Verma",
    customer_email: "rohan@gmail.com",
    customer_phone: "9123456789",
    date: "2026-07-31",
    total: 1999,
    status: "Shipped",
    payment_status: "Paid",
    shipping_address: "House 12, MG Road, Indiranagar, Bengaluru, Karnataka",
    items: [{ name: "URBAN VIBES", size: "M", qty: 1, price: 1999 }],
  },
  {
    id: "ORD-9840",
    customer_name: "Priya Patel",
    customer_email: "priya@gmail.com",
    customer_phone: "9988776655",
    date: "2026-07-30",
    total: 4198,
    status: "Delivered",
    payment_status: "Paid",
    shipping_address: "Plot 88, Jubilee Hills, Hyderabad, Telangana",
    items: [
      { name: "STREET LEGEND", size: "L", qty: 2, price: 2099 },
    ],
  },
  {
    id: "ORD-9839",
    customer_name: "Vikram Singh",
    customer_email: "vikram@gmail.com",
    customer_phone: "9811223344",
    date: "2026-07-29",
    total: 1199,
    status: "Pending",
    payment_status: "Unpaid",
    shipping_address: "Sector 17-C, Chandigarh",
    items: [{ name: "URBAN VIBES", size: "S", qty: 1, price: 1199 }],
  },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    const { status } = req.query;
    let list = [...INITIAL_ORDERS];
    if (status && status !== "ALL") {
      list = list.filter((o) => o.status.toLowerCase() === status.toLowerCase());
    }
    return res.status(200).json({ orders: list });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
