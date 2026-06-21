import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    const containerStyle = {
        width: '95%',
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        background: '#18181b',
        borderRadius: '4px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
        textAlign: 'center'
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ marginBottom: '20px', color: '#10b981' }}>Payment Successful!</h2>
            <p style={{ color: '#a1a1aa', marginBottom: '40px' }}>
            Thank you for your order. We have securely received your payment and will process your shipment shortly.
            </p>
            <Link to="/shop" className="btn">Continue Shopping</Link>
        </div>
    );
};

export default OrderSuccess;
