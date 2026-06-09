const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectDB = require('./config/db');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');

dotenv.config();

const users = [
	{
		name: 'Admin User',
		email: 'admin@primebasket.com',
		password: 'Admin12345',
		role: 'admin',
		verified: true
	},
	{
		name: 'John Doe',
		email: 'john@example.com',
		password: 'Password123',
		role: 'user',
		verified: true
	},
	{
		name: 'Jane Smith',
		email: 'jane@example.com',
		password: 'Password123',
		role: 'user',
		verified: false
	},
	{
		name: 'Aarav Patel',
		email: 'aarav@example.com',
		password: 'Password123',
		role: 'user',
		verified: true
	},
	{
		name: 'Sophia Lee',
		email: 'sophia@example.com',
		password: 'Password123',
		role: 'user',
		verified: true
	},
	{
		name: 'Noah Williams',
		email: 'noah@example.com',
		password: 'Password123',
		role: 'user',
		verified: false
	}
];

const products = [
	{
		name: 'Fresh Apples',
		description: 'Crisp and sweet red apples picked fresh from the orchard.',
		price: 4.99,
		category: 'Fruits',
		imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80',
		stock: 120,
		rating: 4.6,
		numReviews: 34
	},
	{
		name: 'Organic Bananas',
		description: 'Naturally ripened bananas packed with potassium and flavor.',
		price: 2.49,
		category: 'Fruits',
		imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
		stock: 150,
		rating: 4.4,
		numReviews: 28
	},
	{
		name: 'Whole Milk',
		description: 'Fresh whole milk for daily use, tea, coffee, and cereal.',
		price: 3.29,
		category: 'Dairy',
		imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
		stock: 80,
		rating: 4.7,
		numReviews: 19
	},
	{
		name: 'Brown Bread',
		description: 'Soft, healthy brown bread baked fresh every morning.',
		price: 2.99,
		category: 'Bakery',
		imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80',
		stock: 65,
		rating: 4.5,
		numReviews: 21
	},
	{
		name: 'Basmati Rice',
		description: 'Premium long-grain basmati rice for everyday cooking.',
		price: 12.99,
		category: 'Staples',
		imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
		stock: 200,
		rating: 4.8,
		numReviews: 41
	},
	{
		name: 'Green Tea',
		description: 'Light and refreshing green tea bags for a healthy start.',
		price: 5.49,
		category: 'Beverages',
		imageUrl: 'https://images.unsplash.com/photo-1523905330026-b8bd1f5f320d?auto=format&fit=crop&w=800&q=80',
		stock: 90,
		rating: 4.3,
		numReviews: 15
	},
	{
		name: 'Peanut Butter',
		description: 'Creamy peanut butter for toast, snacks, and smoothies.',
		price: 6.99,
		category: 'Pantry',
		imageUrl: 'https://images.unsplash.com/photo-1585238342028-4e7b3f6a7f9b?auto=format&fit=crop&w=800&q=80',
		stock: 55,
		rating: 4.7,
		numReviews: 26
	},
	{
		name: 'Tomatoes',
		description: 'Juicy farm-fresh tomatoes for salads and cooking.',
		price: 3.19,
		category: 'Vegetables',
		imageUrl: 'https://images.unsplash.com/photo-1546470427-e8e11e7ef1e9?auto=format&fit=crop&w=800&q=80',
		stock: 140,
		rating: 4.5,
		numReviews: 31
	},
	{
		name: 'Eggs',
		description: 'Farm fresh eggs, a daily protein staple for every kitchen.',
		price: 4.29,
		category: 'Dairy',
		imageUrl: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=800&q=80',
		stock: 110,
		rating: 4.6,
		numReviews: 29
	},
	{
		name: 'Olive Oil',
		description: 'Cold-pressed olive oil for cooking and dressing.',
		price: 9.99,
		category: 'Pantry',
		imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
		stock: 40,
		rating: 4.8,
		numReviews: 18
	}
];

const seedData = async () => {
	try {
		await connectDB();

		await Promise.all([
			User.deleteMany(),
			Product.deleteMany(),
			Order.deleteMany()
		]);

		const hashedUsers = await Promise.all(
			users.map(async (user) => ({
				...user,
				password: await bcrypt.hash(user.password, 10)
			}))
		);

		const insertedUsers = await User.insertMany(hashedUsers);
		const insertedProducts = await Product.insertMany(products);

		await Order.insertMany([
			{
				user: insertedUsers[1]._id,
				products: [
					{ productId: insertedProducts[0]._id, quantity: 2, price: insertedProducts[0].price },
					{ productId: insertedProducts[2]._id, quantity: 1, price: insertedProducts[2].price }
				],
				totalPrice: insertedProducts[0].price * 2 + insertedProducts[2].price,
				address: {
					fullName: 'John Doe',
					street: '123 Main Street',
					city: 'Boston',
					postalCode: '02110',
					country: 'USA'
				},
				paymentId: 'pay_demo_1001',
				status: 'pending'
			},
			{
				user: insertedUsers[3]._id,
				products: [
					{ productId: insertedProducts[4]._id, quantity: 1, price: insertedProducts[4].price },
					{ productId: insertedProducts[6]._id, quantity: 3, price: insertedProducts[6].price }
				],
				totalPrice: insertedProducts[4].price + insertedProducts[6].price * 3,
				address: {
					fullName: 'Sophia Lee',
					street: '45 Lake Road',
					city: 'Seattle',
					postalCode: '98101',
					country: 'USA'
				},
				paymentId: 'pay_demo_1002',
				status: 'shipped'
			}
		]);

		console.log('Dummy users, products, and orders seeded successfully');
		process.exit(0);
	} catch (error) {
		console.error('Seeding failed:', error);
		process.exit(1);
	}
};

seedData();
