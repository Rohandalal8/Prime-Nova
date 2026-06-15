const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getCartProducts } = require('../controllers/productController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, upload.single('image'), createProduct);
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);
router.route('/cart-stock').post(getCartProducts);

module.exports = router;