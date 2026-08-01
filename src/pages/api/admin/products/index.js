// Admin Products API Route (GET, POST)
let INITIAL_PRODUCTS = [
  {
    id: "1",
    name: "EVERYDAY REBEL",
    slug: "oversized-black-tee",
    price: "999",
    oldPrice: "1299",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Faded Grey"],
    stock_quantity: 45,
    image: "/images/home/new-1.png",
    images: ["/images/home/new-1.png", "/images/home/new-4.png"],
    is_active: true,
    is_featured: true,
    description: "Engineered 450GSM heavy cotton oversized streetwear t-shirt.",
  },
  {
    id: "2",
    name: "LIMITLESS SPIRIT",
    slug: "urban-white-hoodie",
    price: "1999",
    oldPrice: "2499",
    category: "Hoodies",
    sizes: ["M", "L", "XL"],
    colors: ["Off White"],
    stock_quantity: 12,
    image: "/images/home/new-2.png",
    images: ["/images/home/new-2.png", "/images/home/new-5.png"],
    is_active: true,
    is_featured: true,
    description: "Heavyweight French Terry cotton hoodie with custom motorsport-inspired graphics.",
  },
  {
    id: "3",
    name: "URBAN VIBES",
    slug: "nowhere-graphic-tee",
    price: "1199",
    oldPrice: "1499",
    category: "T-Shirts",
    sizes: ["S", "M", "L"],
    colors: ["Charcoal"],
    stock_quantity: 3,
    image: "/images/home/new-3.png",
    images: ["/images/home/new-3.png", "/images/home/new-1.png"],
    is_active: true,
    is_featured: false,
    description: "Hand-finished motorsport livery oversized graphic tee.",
  },
  {
    id: "4",
    name: "STREET LEGEND",
    slug: "minimal-cream-hoodie",
    price: "2099",
    oldPrice: "2499",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream"],
    stock_quantity: 28,
    image: "/images/home/new-5.png",
    images: ["/images/home/new-5.png"],
    is_active: true,
    is_featured: false,
    description: "Minimalist cream heavyweight hoodie with subtle high-density print.",
  },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ products: INITIAL_PRODUCTS });
  }

  if (req.method === "POST") {
    const { name, price, oldPrice, category, sizes, stock_quantity, description, image } = req.body;

    const newProduct = {
      id: String(Date.now()),
      name: name || "NEW UNNAMED DROP",
      slug: (name || "new-drop").toLowerCase().replace(/\s+/g, "-"),
      price: String(price || 999),
      oldPrice: String(oldPrice || 1299),
      category: category || "T-Shirts",
      sizes: sizes || ["S", "M", "L", "XL"],
      stock_quantity: Number(stock_quantity || 10),
      image: image || "/images/home/new-1.png",
      images: [image || "/images/home/new-1.png"],
      is_active: true,
      is_featured: false,
      description: description || "Heavyweight 450GSM streetwear product.",
    };

    INITIAL_PRODUCTS.unshift(newProduct);
    return res.status(201).json({ message: "Product created successfully", product: newProduct });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
