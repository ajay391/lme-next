import ProductCard  from "./ProductCard";  // Adjust the import path based on your file structure

const featuredProducts = [
  {
    id: 1,
    name: "EVERYDAY REBEL",
    slug: "oversized-black-tee",
    price: "999",
    oldPrice: "1299",  // Example of a product with oldPrice
    image: "/images/home/new-1.avif",
    images: [
      "/images/products/category-1.jpg",
      "/images/products/category-2.jpg",
      "/images/products/category-3.jpg"
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
      "/images/products/category-2.jpg",
      "/images/products/category-3.jpg",
      "/images/products/category-4.jpg"
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
      "/images/products/category-3.jpg",
      "/images/products/category-4.jpg",
      "/images/products/category-5.jpg"
    ],
    category: "T-Shirts",
    description: "A graphic tee that showcases the Nowhere brand with bold prints.",
        sizes: ["S", "M", "L", "XL"],
    isNew: true, 
  },
];

export const NewProducts = () => (
  <section className="py-16 px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32">
    <h2 className="text-5xl sm:text-5xl font-bold mb-4 text-start">New Drops</h2>
    <p className="text-base text-black opacity-60 mb-12 text-start max-w-2xl">
      Discover our latest collection—unique styles, premium fabrics, and perfect fits. Limited stock, once they're gone, they're gone!
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mx-auto">
      {featuredProducts.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  </section>
);
