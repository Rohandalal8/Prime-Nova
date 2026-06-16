# Prime Nova

Prime Nova is a full-stack MERN e-commerce platform designed for handcrafted products. The platform provides a seamless shopping experience with secure authentication, product management, shopping cart functionality, order tracking, and online payments through Razorpay.

## Features

### User Features

* User Registration and Login
* Email Verification with OTP
* Forgot Password and Password Reset
* Browse Handcrafted Products
* Product Search and Filtering
* Shopping Cart Management
* Secure Checkout
* Razorpay Payment Integration
* Order History and Tracking
* Responsive Design

### Admin Features

* Admin Dashboard
* Add, Update, and Delete Products
* Manage Orders
* Update Order Status
* Inventory Management
* User Management

## Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Nodemailer

### Payment Gateway

* Razorpay

## Installation

### Clone the Repository

```bash
git clone https://github.com/Rohandalal8/Prime-Nova.git
cd Prime-Nova
```

### Install Dependencies

npm run install-all

## Environment Variables

### Backend (.env)

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

### Frontend (.env)

REACT_APP_RAZORPAY_KEY_ID=your_key_id

## Run Project

### Start Frontend & Backend Together

npm run dev

### Start Backend Only

npm run start:backend

### Start Frontend Only

npm run start:frontend

### Build Frontend

npm run build

### Available Scripts

npm run install-all
npm run dev
npm run start:backend
npm run start:frontend
npm run build

## Project Structure

Prime-Nova/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── package.json
└── README.md

## Security Features

* JWT Authentication
* Password Hashing with bcrypt
* Protected Admin Routes
* OTP-Based Email Verification
* Secure Payment Verification
* Stock Validation Before Order Placement

## Future Improvements

* Product Reviews and Ratings
* Wishlist Functionality
* Coupon and Discount System
* Multi-Currency Support
* Multi-Language Support
* Real-Time Order Tracking

## License

Copyright © 2026 Prime Nova.

All rights reserved.

This project powers the Prime Nova e-commerce platform and is intended for commercial use. Unauthorized copying, distribution, modification, or use of this software without permission is prohibited.

## Author

Developed by Rohan Dalal
