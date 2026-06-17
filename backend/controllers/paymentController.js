const instance = require('../config/razorpay');
const crypto = require('crypto');

const createdOrder = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const options = {
            amount: Math.round(amount * 100), // Amount in paise
            currency: currency || 'INR',
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

