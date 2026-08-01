// API endpoint for Admin Dashboard Stats & Revenue Analytics
export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Generate 30-day revenue chart data
  const revenueChartData = [
    { date: "Day 1", revenue: 14500, orders: 8 },
    { date: "Day 5", revenue: 22000, orders: 12 },
    { date: "Day 10", revenue: 18900, orders: 10 },
    { date: "Day 15", revenue: 34500, orders: 18 },
    { date: "Day 20", revenue: 28000, orders: 15 },
    { date: "Day 25", revenue: 41200, orders: 22 },
    { date: "Day 30", revenue: 49800, orders: 26 },
  ];

  return res.status(200).json({
    totalRevenue: 208900,
    totalOrders: 111,
    activeProducts: 24,
    totalCustomers: 89,
    lowStockCount: 3,
    revenueChart: revenueChartData,
    recentOrders: [
      {
        id: "ORD-9842",
        customer: "Aarav Sharma",
        email: "aarav@gmail.com",
        date: "2026-08-01",
        total: 2998,
        status: "Processing",
        payment: "Paid",
      },
      {
        id: "ORD-9841",
        customer: "Rohan Verma",
        email: "rohan@gmail.com",
        date: "2026-07-31",
        total: 1999,
        status: "Shipped",
        payment: "Paid",
      },
      {
        id: "ORD-9840",
        customer: "Priya Patel",
        email: "priya@gmail.com",
        date: "2026-07-30",
        total: 4198,
        status: "Delivered",
        payment: "Paid",
      },
      {
        id: "ORD-9839",
        customer: "Vikram Singh",
        email: "vikram@gmail.com",
        date: "2026-07-29",
        total: 1199,
        status: "Pending",
        payment: "Unpaid",
      },
    ],
  });
}
