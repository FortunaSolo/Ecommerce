const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const productController = require('../controllers/productController');
const { 
    getAllProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
} = require('../controllers/productController');

// GET request to fetch all products
router.get('/', getAllProducts);

// POST request to create a new product
router.post('/', upload.single('image'), productController.createProduct);

// PUT request for Updating a Product
router.put('/:id', upload.single('image'), productController.updateProduct);

// DELETE Route for Deleting a Product
router.delete('/:id', deleteProduct); // Add this route

module.exports = router;
