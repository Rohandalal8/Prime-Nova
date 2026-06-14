import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/product.css';

function ProductCard({ product }) {
    return (
        <Link to={`/product/${product._id}`} className="product-card">
            <div className="product-card">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;