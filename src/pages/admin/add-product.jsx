import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleImageUpload = async () => {
    const formData = new FormData();
    images.forEach((image) => formData.append('file', image));
    formData.append('upload_preset', 'lme_unsigned'); // Your Cloudinary preset

    setIsUploading(true);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dxtmkvwrp/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Image upload failed:', error);
      return '';
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await handleImageUpload();
    if (!imageUrl) return;

    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      console.error('No token found!');
      router.push('/login');
      return;
    }

    try {
      const response = await axios.post(
        '/api/admin/products',
        {
          name: productName,
          price: Number(price),
          description,
          category,
          stock: Number(stock),
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log('Product added:', response.data);
      router.push('/admin/products');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        ></textarea>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files || []))}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isUploading}
          className="w-full bg-blue-500 text-white rounded py-2"
        >
          {isUploading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
