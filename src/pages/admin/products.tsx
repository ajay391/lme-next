// pages/admin/products.tsx
import AdminSidebar from '@/components/AdminSidebar';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}

export default function AdminProductsPage() {
    const { loading } = useAdminAuth();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found!');
                    router.push('/login');
                    return;
                }

                const res = await axios.get('/api/admin/products', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(res.data.products || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoadingProducts(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading || isLoadingProducts) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-lg font-medium text-gray-700">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex">
            <AdminSidebar />
            <main className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">All Products</h1>
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="py-3 px-4">Name</th>
                                    <th className="py-3 px-4">Category</th>
                                    <th className="py-3 px-4">Price</th>
                                    <th className="py-3 px-4">Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4">{product.name}</td>
                                        <td className="py-3 px-4">{product.category}</td>
                                        <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                                        <td className="py-3 px-4">{product.stock}</td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="text-center py-6 text-gray-500">
                                            No products found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
