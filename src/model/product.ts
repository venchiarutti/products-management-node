import mongoose, { Model } from 'mongoose';
import { IProduct } from './api/productInterface';

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export const ProductModel: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);