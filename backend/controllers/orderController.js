const Order = require('../models/orderModel');
const Product = require('../models/productModel');

const sendEmail = require('../utils/sendEmail');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { products, totalPrice, address, paymentId } = req.body;
        const incomingProducts = products;
        const orderTotalPrice = totalPrice;
        const orderProducts = (incomingProducts || []).map((item) => ({
            productId: item.productId || item._id,
            quantity: item.quantity || item.qty || 1,
            price: item.price
        }));

        const hasValidProducts = orderProducts.length > 0 && orderProducts.every((item) => item.productId && item.quantity > 0 && typeof item.price === 'number');

        if (!hasValidProducts || !orderTotalPrice || !address || !address.mobileNumber) {
            return res.status(400).json({ message: 'No products in the order' });
        }

        const order = new Order({
            user: req.user._id,
            products: orderProducts,
            totalPrice: orderTotalPrice,
            address,
            paymentId
        });

        const createdOrder = await order.save();

        for (const item of orderProducts) {
            const product = await Product.findById(item.productId);

            if (!product) {
                continue;
            }

            product.stock -= item.quantity;

            if (product.stock < 0) {
                product.stock = 0;
            }

            await product.save();
        }

        // Send order confirmation email
        const message = `
Dear ${req.user.name},
Thank you for your order! Your order has been received and is being processed. Here are the details of your order:
Order ID: ${createdOrder._id}
Total Price: $${orderTotalPrice}
Shipping Address: ${address.fullName}, ${address.street}, ${address.city}, ${address.postalCode}, ${address.country}
Mobile Number: ${address.mobileNumber}
You can track your order status in your profile. If you have any questions, feel free to contact our support team.
Thank you for shopping with Prime Basket!`;

        try {
            await sendEmail(req.user.email, 'Order Confirmation - Prime Basket', message);
        } catch (emailError) {
            console.error('Order confirmation email failed:', emailError);
        }

        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('createOrder failed:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get orders for the logged-in user
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('products.productId', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'name email')
            .populate('products.productId', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { 
    createOrder,
    getMyOrders,
    getOrders,
    updateOrderStatus
};
