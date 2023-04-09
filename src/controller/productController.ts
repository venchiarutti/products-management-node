import { ProductModel } from "../model/product";
import { IProduct } from "../model/api/productInterface";

export class ProductController {
    public static async getAllProducts(): Promise<IProduct[]> {
      try {
        const products = await ProductModel.find();
        return products;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
}