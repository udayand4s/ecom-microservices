const express = require('express');

const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { authMiddleware, adminOnly } = require('../middlewares/authmiddleware');

const router = express.Router();

router.get('/', getProducts);
router.post('/create', createProduct, authMiddleware, adminOnly);
router.put('/update', updateProduct, authMiddleware, adminOnly);
router.delete('/delete', deleteProduct);

module.exports = router;
