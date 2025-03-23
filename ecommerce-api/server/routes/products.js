//server/routes/products.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const productController = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');


// Public routes
router.get('/my-products', protect, authorize('user', 'admin'), productController.getMyProducts);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Protected routes

router.post('/', protect, authorize('user', 'admin'), upload.single('image'), productController.createProduct);
router.put('/:id', protect, authorize('user', 'admin'), upload.single('image'), productController.updateProduct);
router.delete('/:id', protect, authorize('user', 'admin'), productController.deleteProduct);

module.exports = router;
