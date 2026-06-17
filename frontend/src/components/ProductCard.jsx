import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/product.css';

function ProductCard({ product }) {

    const discountedPrice = product.price - ((product.price * product.discount) / 100);

    return (
        <Link to={`/product/${product._id}`} className="product-card">
            <div className="product-card">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    {product.discount > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                            <p className="product-price">
                                ${discountedPrice.toFixed(2)}
                            </p>

                            <p className="product-discounted-price">
                                ${product.price.toFixed(2)}
                            </p>
                        
                            <span className="product-discount">
                                {product.discount}% OFF
                            </span>
                        </div>
                    ) : (
                        <p className="product-price">
                            ${product.price.toFixed(2)}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;