import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { Product } from '../model/product';

export default class ProductRouter {
  private router = express.Router();

  constructor() {
    this.router.use(bodyParser.json());
    this.router.post('/', this.createProduct);
    this.router.get('/', this.getAllProducts);
    this.router.delete('/', this.deleteProducts);
  }

  public getRouter() {
    return this.router;
  }

  private async createProduct(req: Request, res: Response) {
    try {
      const { sku, name, price, type, customAttributes } = req.body;
      const product = new Product({
        sku,
        name,
        price,
        type,
        customAttributes,
      });
      await product.save();
      res.json(product);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  private async getAllProducts(req: Request, res: Response) {
    try {
      const products = await Product.find({});
      const formattedProducts = products.map((product) => {
        const formattedCustomAttributes: Record<string, string> = {};
        product.customAttributes.forEach((attr) => {
          formattedCustomAttributes[attr.name] = attr.value;
        });
        return {
          ...product.toObject(),
          customAttributes: formattedCustomAttributes,
        };
      });
      res.send(formattedProducts);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  private async deleteProducts(req: Request, res: Response) {
    try {
      const { ids } = req.body;
      const result = await Product.deleteMany({ _id: { $in: ids } });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }
}