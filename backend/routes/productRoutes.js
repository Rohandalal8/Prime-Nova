const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getCartProducts } = require('../controllers/productController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, upload.array('images', 8), createProduct);
router.route('/:id').get(getProductById).put(protect, admin, upload.array('images', 8), updateProduct).delete(protect, admin, deleteProduct);
router.route('/cart-stock').post(getCartProducts);

module.exports = router;