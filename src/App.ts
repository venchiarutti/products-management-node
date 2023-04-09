import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ProductController } from './controller/productController';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.connect();
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    dotenv.config();
  }

  private routes(): void {
    this.app.get('/products', async (req, res) => {
        try {
          const products = await ProductController.getAllProducts();
          res.json(products);
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
      });
  }

  private connect(): void {
    mongoose.connect(process.env.MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('MongoDB database connection established successfully');
    });
  }

  public start(): void {
    this.app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  }
}

export default new App().app;