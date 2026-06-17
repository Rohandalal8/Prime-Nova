const instance = require('../config/razorpay');
const Product = require('../models/productModel');
const crypto = require('crypto');

const createdOrder = async (req, res) => {
    try {
        const { products, address } = req.body;

          if (
            !address ||
            !address.fullName?.trim() ||
            !address.mobileNumber?.trim() ||
            !address.street?.trim() ||
            !address.city?.trim() ||
            !address.postalCode?.trim() ||
            !address.country?.trim()
        ) {
            return res.status(400).json({
                message: 'Complete address is required'
            });
        }

        let totalAmount = 0;

        for (const item of products) {
            const product = await Product.findById(item.productId || item._id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `${product.name} has only ${product.stock} items left in stock` });
            }

            const discountedPrice = product.price - (product.price * product.discount) / 100;

            totalAmount += discountedPrice * item.quantity;
        }

        const tax = totalAmount * 0.08;
        const shipping = 5;
        totalAmount += tax + shipping;

        const options = {
            amount: Math.round(totalAmount * 100), // Amount in paise
            currency: 'INR',
            receipt: crypto.randomBytes(10).toString('hex'),
        };
        const order = await instance.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');
        if (generated_signature === razorpay_signature) {
            res.json({ message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ message: 'Payment verification failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createdOrder,
    verifyPayment
};

