const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/userModel');
dotenv.config();
connectDB();

setInterval(async () => {
    try {
        await User.updateMany(
            {
                verificationCode: { $lt: new Date() }
            },
            {
                $unset: {
                    verificationCode: "",
                    verificationExpires: "",
                    resetPasswordExpires: ""
                }
            }
        );
    } catch (error) {
        console.error('OTP cleanup error:', error);
    }
}, 5 * 60 * 1000);

const app = express();
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

app.get('/', (req, res) => {
    res.send('Prime Nova API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});