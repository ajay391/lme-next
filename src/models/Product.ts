import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  publicId: string; // Add publicId field to store the Cloudinary public ID
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  publicId: { type: String, required: true }, // Store the public ID here
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;
