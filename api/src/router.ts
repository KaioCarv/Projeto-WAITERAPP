 import { Router } from "express";
import multer from 'multer';
import path from 'node:path';

import { createCategory } from "./app/useCases/categories/createCategory";
import { listCategories } from "./app/useCases/categories/listCategories";
import { createProduct } from "./app/useCases/products/createProducts";
import { listProducts } from "./app/useCases/products/listProducts";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
    callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
  }),
});
//List Category
 router.get('/categories', listCategories);
//Create Category
 router.post('/categories', createCategory);
//List Product
 router.get('/products', listProducts);
//Create Product
router.post('/products',upload.single('image'), createProduct);
 //Get products by category
 router.get('/categories/:categoryId/products', (req,res) => {
  res.send('OK');
 });
 //List orders
 router.get('/orders', (req,res) => {
  res.send('OK');
 });
 //Craete order
 router.post('/orders', (req,res) => {
  res.send('OK');
 });
//Change order status
router.patch('/orders/:orderId', (req,res) => {
  res.send('OK');
 });

//Delete/cancel order
router.delete('/orders/:orderId', (req,res) => {
  res.send('Ookkk');
 });
