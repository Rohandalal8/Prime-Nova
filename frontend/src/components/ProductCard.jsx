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
                        <>
                            <p style={{
                                textDecoration: 'line-through',
                                color: '#999'
                            }}>
                                ${product.price.toFixed(2)}
                            </p>

                            <p style={{
                                color: '#f97316',
                                fontSize: '1.7rem',
                                fontWeight: 'bold'
                            }}>
                                ${discountedPrice.toFixed(2)}
                            </p>

                            <span style={{
                                background: '#ef4444',
                                color: '#fff',
                                padding: '4px 8px',
                                borderRadius: '5px'
                            }}>
                                {product.discount}% OFF
                            </span>
                        </>
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