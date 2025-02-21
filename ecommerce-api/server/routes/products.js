const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, } = require('../controllers/productController');

// GET request to fetch all products
router.get('/', getAllProducts);

// POST request to create a new product
router.post('/', createProduct);

// PUT request for Updating a Product
router.put('/:id', updateProduct);

module.exports = router;
