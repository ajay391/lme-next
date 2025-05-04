export type Product = {
  id: number;
  name: string;
  slug: string;
  price: string;
  oldPrice?: string;
  image: string;
  images: string[];
  description?: string;
  category: string;
  sizes?: string[];
  isNew?: boolean;  // Optional field to indicate if the product is new
};

const allProducts: Product[] = [
  {
    id: 1,
    name: "EVERYDAY REBEL",
    slug: "oversized-black-tee",
    price: "999",
    oldPrice: "1299",  // Example of a product with oldPrice
    image: "/images/home/new-1.avif",
    images: [
      "/images/products/category-1.avif",
      "/images/products/category-2.avif",
      "/images/products/category-3.avif"
    ],
    category: "T-Shirts",
    description: "A comfortable black tee, perfect for any occasion.",
        sizes: ["S", "M", "L", "XL"],
    isNew: true, 
  },
  {
    id: 2,
    name: "LIMITLESS SPIRIT",
    slug: "urban-white-hoodie",
    price: "1999",
    image: "/images/home/new-2.avif",
    images: [
      "/images/products/category-2.avif",
      "/images/products/category-3.avif",
      "/images/products/category-4.avif"
    ],
    category: "Hoodies",
    description: "A clean, urban-style hoodie in white with minimalist design.",
        sizes: ["S", "M", "L", "XL"],
    isNew: true, 
  },
  {
    id: 3,
    name: "URBAN VIBES",
    slug: "nowhere-graphic-tee",
    price: "1199",
    image: "/images/home/new-3.avif",
    images: [
      "/images/products/category-3.avif",
      "/images/products/category-4.avif",
      "/images/products/category-5.avif"
    ],
    category: "T-Shirts",
    description: "A graphic tee that showcases the Nowhere brand with bold prints.",
        sizes: ["S", "M", "L", "XL"],
    isNew: true, 
  },
  {
    id: 4,
    name: "STREET LEGEND",
    slug: "minimal-cream-hoodie",
    price: "2099",
    oldPrice: "2499",  // Example of a product with oldPrice
    image: "/images/products/category-2.avif",
    images: [
      "/images/products/category-4.avif",
      "/images/products/category-5.avif",
      "/images/products/category-3.avif"
    ],
    category: "Hoodies",
    description: "A soft cream hoodie with minimal branding for a clean, stylish look.",
        sizes: ["S", "M", "L", "XL"],
    isNew: false, 
  },
  {
    id: 5,
    name: "URBAN VIBES",
    slug: "drop-shoulder-tee",
    price: "1299",
    image: "/images/products/category-10.avif",
    images: [
      "/images/products/category-5.avif",
      "/images/products/category-3.avif",
      "/images/products/category-1.avif"
    ],
    category: "T-Shirts",
    description: "A drop shoulder tee for a relaxed fit with a modern silhouette.",
        sizes: ["S", "M", "L", "XL"],
    isNew: false, 
  },
  {
    id: 6,
    name: "UNSEEN REALM",
    slug: "oversized-washed-tee",
    price: "1399",
    image: "/images/products/category-7.avif",
    images: [
      "/images/products/category-6.avif",
      "/images/products/category-5.avif",
      "/images/products/category-2.avif"
    ],
    category: "T-Shirts",
    description: "A faded, oversized tee that gives a vintage feel to your outfit.",
        sizes: ["S", "M", "L", "XL"],
    isNew: false, 
  },
  {
    id: 7,
    name: "MINIMAL POWER",
    slug: "cropped-hoodie",
    price: "1899",
    image: "/images/products/category-8.avif",
    images: [
      "/images/products/category-7.avif",
      "/images/products/category-5.avif",
      "/images/products/category-7.avif"
    ],
    category: "Hoodies",
    description: "A cropped hoodie with a modern fit and comfortable feel.",
        sizes: ["S", "M", "L", "XL"],
    isNew: false, 
  },
  {
    id: 8,
    name: "PRIME STREETWEAR",
    slug: "nowhere-classic-tee",
    price: "1099",
    image: "/images/products/category-9.avif",
    images: [
      "/images/products/category-1.avif",
      "/images/products/category-2.avif",
      "/images/products/category-7.avif"
    ],
    category: "T-Shirts",
    description: "A classic, simple tee with Nowhere's signature logo on the front.",
        sizes: ["S", "M", "L", "XL"],
    isNew: false, 
  },
];

export default allProducts;
