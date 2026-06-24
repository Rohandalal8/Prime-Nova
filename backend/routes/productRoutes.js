const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getCartProducts, addProductReview } = require('../controllers/productController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, upload.array('images', 12), createProduct);
router.route('/:id').get(getProductById).put(protect, admin, upload.array('images', 12), updateProduct).delete(protect, admin, deleteProduct);
router.route('/cart-stock').post(getCartProducts);
router.route('/:id/reviews').post(protect, addProductReview);

module.exports = router;