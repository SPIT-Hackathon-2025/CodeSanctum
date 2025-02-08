const express = require('express');
const router = express.Router();
const { addProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.post('/', addProduct); // Add Product
router.put('/:product_id', updateProduct); // Update Product
router.delete('/:product_id', deleteProduct); // Delete Product

module.exports = router;
