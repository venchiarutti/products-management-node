import mongoose, { Document, Schema } from "mongoose";

interface ICustomAttribute {
  name: string;
  value: string;
}

interface IProduct extends Document {
  sku: string;
  name: string;
  price: number;
  type: string;
  customAttributes: ICustomAttribute[];
}

class ProductSchema extends Schema {
  constructor() {
    super({
      sku: { type: String, unique: true, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      type: { type: String, required: true },
      customAttributes: [
        {
          name: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
    });
  }
}

export const Product = mongoose.model<IProduct>(
  "Product",
  new ProductSchema()
);