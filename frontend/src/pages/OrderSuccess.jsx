import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    const containerStyle = {
        width: '95%',
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        background: '#fff8ef',
        borderRadius: '4px',
        border: '1px solid rgba(111, 68, 40, 0.12)',
        boxShadow: '0 10px 40px rgba(91, 57, 34, 0.16)',
        textAlign: 'center'
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ marginBottom: '20px', color: '#10b981' }}>Payment Successful!</h2>
            <p style={{ color: '#7b6550', marginBottom: '40px' }}>
            Thank you for your order. We have securely received your payment and will process your shipment shortly.
            </p>
            <Link to="/" className="btn">Continue Shopping</Link>
        </div>
    );
};

export default OrderSuccess;
