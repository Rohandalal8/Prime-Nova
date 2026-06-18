import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import '../styles/product.css';

function ProductCard({ product }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state?.cart?.cartItems || state?.cart?.items || []);
    const navigate = useNavigate();

    const discountedPrice = product.price - ((product.price * product.discount) / 100);

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigation when clicking "Add to Cart"

        const alreadyInCart = cartItems.find(item => (item.productId || item._id) === product._id);

        if (alreadyInCart) {
            toast.info(`${product.name} is already in your cart!`);
            return;
        }

        if (product && product.stock > 0) {
            dispatch(addToCart({
                productId: product._id,
                name: product.name,
                price: product.price,
                discount: product.discount,
                imageUrl: product.imageUrl?.[0],
                stock: product.stock,
                qty: 1
            }));
            toast.success(`${product.name} added to cart!`);
        }
    };

    const handleBuyNow = (e) => {
        e.preventDefault(); // Prevent navigation when clicking "Buy Now"

        navigate('/checkout', { 
            state: { 
                buyNowItems: [
                    {
                        ...product, 
                        qty: 1 
                    }
                ] 
            } 
        });
    };

    return (
        <Link to={`/product/${product._id}`} className="product-card">
            <div className="product-card">
                <img src={product.imageUrl?.[0]} alt={product.name} className="product-image" />
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexDirection: 'column', width: '100%' }}>
                        <button onClick={handleAddToCart} disabled={product.stock <= 0} className="btn" style={{ flexGrow:'1', padding:'6px', fontSize:'1rem', width: '100%', background: 'none', color: '#f97316', border: '1px solid #f97316', opacity: product.stock <= 0 ? 0.5 : 1, cursor: product.stock <= 0 ? 'not-allowed' : 'pointer' }}>
                            {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>

                        <button onClick={handleBuyNow} disabled={product.stock <= 0} className="btn" style={{ flexGrow:'1', padding:'6px', fontSize:'1rem', width: '100%', opacity: product.stock <= 0 ? 0.5 : 1, cursor: product.stock <= 0 ? 'not-allowed' : 'pointer' }}>
                            {product.stock <= 0 ? 'Out of Stock' : 'Buy Now'}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;