import express from 'express';
import mongoose from 'mongoose';
import ProductRouter from './src/controller/productRouter';

mongoose.connect('mongodb://localhost:27017/products-management');

const app = express();
const productRouter = new ProductRouter().getRouter();

app.use('/products', productRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});