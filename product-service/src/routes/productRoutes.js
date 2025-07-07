const express = require('express');

const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.post('/create', createProduct);
router.put('/update', updateProduct);
router.delete('/delete', deleteProduct);

module.exports = router;
