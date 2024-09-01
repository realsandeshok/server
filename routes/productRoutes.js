const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, stockManager } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, stockManager, createProduct); 

router.route('/:id')
  .put(protect, stockManager, updateProduct)
  .delete(protect, stockManager, deleteProduct);

module.exports = router;
