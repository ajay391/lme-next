// Admin Categories API Route
let INITIAL_CATEGORIES = [
  { id: "1", name: "T-Shirts", slug: "t-shirts", count: 14 },
  { id: "2", name: "Hoodies", slug: "hoodies", count: 8 },
  { id: "3", name: "Jackets", slug: "jackets", count: 4 },
  { id: "4", name: "Accessories", slug: "accessories", count: 6 },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ categories: INITIAL_CATEGORIES });
  }

  if (req.method === "POST") {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Category name is required" });

    const newCat = {
      id: String(Date.now()),
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      count: 0,
    };
    INITIAL_CATEGORIES.push(newCat);
    return res.status(201).json({ message: "Category created", category: newCat });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
