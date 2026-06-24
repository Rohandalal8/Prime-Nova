const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String
    },
    verificationExpires: {
        type: Date,
        default: Date.now,
        expires: 120 // Document will be deleted after 120 seconds if not verified
    },
    resetPasswordExpires: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;