const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers, registerOtp, forgotPassword, forgotPasswordOtp, resetPassword } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

router.post('/register', registerUser);
router.post('/register-otp', registerOtp);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/forgot-password-otp', forgotPasswordOtp);
router.post('/reset-password', resetPassword);
router.get('/users', protect, admin, getUsers);

module.exports = router;