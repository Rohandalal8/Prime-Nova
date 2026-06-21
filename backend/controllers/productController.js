const Product = require('../models/productModel');
const Review = require('../models/reviewModel');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "prime_nova"
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const reviews = await Review.find({ productId: req.params.id }).populate('userId', 'name').sort({ createdAt: -1 });
        res.json({ ...product.toObject(), reviews });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price, discount, category, stock } = req.body;
        let imageUrl = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(file.buffer);
                imageUrl.push(result.secure_url);
            }
        }
        const product = new Product({
            name,
            description,
            price,
            discount,
            category,
            stock,
            imageUrl
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, discount, category, stock } = req.body;
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discount = discount || product.discount;
            product.category = category || product.category;
            product.stock = stock || product.stock;
            if (req.files && req.files.length > 0) {
                const imageUrl = [];
                for (const file of req.files) {
                    const result = await uploadToCloudinary(file.buffer);
                    imageUrl.push(result.secure_url);
                }
                product.imageUrl = imageUrl;
            }
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await Product.findByIdAndDelete(req.params.id);
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getCartProducts = async (req, res) => {
    try {
        const { ids } = req.body;

        const products = await Product.find({
            _id: { $in: ids }
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        });
    }
};

const addProductReview = async (req, res) => {
    try {
        const productId = req.params.id;
        const { rating, comment } = req.body;
        const userId = req.user._id;
        const review = new Review({
            productId,
            userId,
            rating,
            comment
        });
        const savedReview = await review.save();

        // Update product's average rating and number of reviews
        const reviews = await Review.find({ productId });
        const numReviews = reviews.length;

        const totalRating = reviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );

        const avgRating = totalRating / numReviews;

        await Product.findByIdAndUpdate(productId, {
            numReviews,
            avgRating
        });

        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getCartProducts,
    addProductReview
};