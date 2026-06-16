const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Create new user
        const user = await User.create({ name, email, password: hashedPassword, verificationCode: otp, });
        // Generate OTP
        if (user) {
            const message = `Welcome to Prime Nova, ${name}!

Thank you for registering with Prime Nova. Use the One-Time Password (OTP) below to complete your registration:

OTP: ${otp}

This OTP is for your Prime Nova account verification. Please do not share it with anyone.

If you did not create a Prime Nova account, you can safely ignore this email.

Regards,
Prime Nova Team`;
            
            await sendEmail(email, 'Welcome to Prime Nova - Your OTP', message); 
            res.status(201).json({ message: 'Please check your email for the OTP to complete registration.' });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Verify OTP for registration
const registerOtp = async (req, res) => {
    const { otp } = req.body;
    try {
        const user = await User.findOne({ verificationCode: otp });
        if (user) {
            user.verified = true;
            user.verificationCode = undefined;
            user.verificationExpires = undefined;
            await user.save();
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                verified: user.verified,
                token: generateToken(user._id)
             });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                verified: user.verified,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Forgot password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationCode = otp;
        user.resetPasswordExpires = Date.now() + 2 * 60 * 1000;
        user.verificationExpires = undefined;
        await user.save();

        const message = `You have requested a password reset for your Prime Nova account.

Use the One-Time Password (OTP) below to reset your password:

OTP: ${otp}

This OTP is for your Prime Nova account verification. Please do not share it with anyone.

If you did not request a password reset, you can safely ignore this email.

Regards,
Prime Nova Team`;

        await sendEmail(email, 'Password Reset Request', message);
        res.status(200).json({ message: 'Please check your email for the OTP to reset your password.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Verify OTP for forgot password
const forgotPasswordOtp = async (req, res) => {
    const { otp } = req.body;
    try {
        const user = await User.findOne({ verificationCode: otp });
        if (user) {
            if (user.resetPasswordExpires < Date.now()) {
                user.verificationCode = undefined;
                user.resetPasswordExpires = undefined;
                user.verificationExpires = undefined;
                await user.save();
                return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
            }
            user.verificationCode = undefined;
            user.resetPasswordExpires = undefined;
            user.verificationExpires = undefined;
            await user.save();
            res.status(201).json({
                message: 'OTP verified. You can now reset your password.',
             });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Reset password
const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.verificationExpires = undefined;
        await user.save();
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all users (for admin)
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); // Exclude password from response
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, getUsers, registerOtp, forgotPassword, forgotPasswordOtp, resetPassword };
