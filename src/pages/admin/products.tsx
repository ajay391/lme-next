// pages/admin/products.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
}

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          router.push('/login');
          return;
        }

        const res = await axios.get('/api/admin/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const handleDelete = async (productId: string) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No token found!');
      router.push('/login');
      return;
    }
  
    try {
      const response = await axios.delete(`/api/admin/products?productId=${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Product deleted:', response.data);
      // You can also trigger a refresh of the product list here
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">${product.price}</td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4">{product.stock}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductsPage;
