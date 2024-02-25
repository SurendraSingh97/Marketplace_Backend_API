const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// CRUD operations routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.addNewProduct);
router.put('/:id', productController.updateProduct);
router.delete('/', productController.deleteAllProducts);
router.delete('/:id', productController.deleteProductById);

module.exports = router;