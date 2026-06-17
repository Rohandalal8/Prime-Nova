import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import '../styles/product.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state?.cart?.cartItems || state?.cart?.items || []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        
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
                imageUrl: product.imageUrl,
                stock: product.stock,
                qty: 1
            }));
            toast.success(`${product.name} added to cart!`);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', margin: '100px', color: '#f97316' }}>Loading product details...</div>;

    if (!product) return <div style={{ textAlign: 'center', margin: '100px', color: '#ef4444' }}>Product not found.</div>;

    const discountedPrice = product.price - ((product.price * product.discount) / 100);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <div style={{ color: '#a1a1aa', marginBottom: '20px', fontSize: '0.95rem' }}>
                <Link to="/" style={{ color: '#f97316' }}>Home</Link> / <Link to="/shop" style={{ color: '#f97316' }}>Shop</Link> / {product.category} / <span style={{ color: '#fff' }}>{product.name}</span>
            </div>

            <div className="product-detail">
                <div className="detail-image-container">
                    <img src={product.imageUrl} alt={product.name} className="detail-image" />
                </div>

                <div className="detail-info">
                    <h2 style={{ marginBottom: '10px' }}>{product.name}</h2>
                    {product.discount > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                            <span className="product-price">
                                ${discountedPrice.toFixed(2)}
                            </span>

                            <span className="product-discounted-price">
                                ${product.price.toFixed(2)}
                            </span>
                        
                            <span className="product-discount" style={{ display: 'inline-block' }}>
                                {product.discount}% OFF
                            </span>
                        </div>
                    ) : (
                        <span className="product-price">
                            ${product.price.toFixed(2)}
                        </span>
                    )}
                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: '#fff', marginBottom: '5px' }}>Product Description</h4>
                        <p style={{ color: '#a1a1aa', lineHeight: '1' }}>
                            {product.description}
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <button onClick={handleAddToCart} disabled={product.stock <= 0} className="btn" style={{ flexGrow:'1', padding:'18px', fontSize:'1.2rem', opacity: product.stock <= 0 ? 0.5 : 1, cursor: product.stock <= 0 ? 'not-allowed' : 'pointer' }}>
                            {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                    <p style={{ marginTop: '20px', color: product.stock > 0 ? '#f97316' : '#ef4444', fontWeight: '600' }}>
                        {product.stock > 0 && product.stock <= 5 ? `Only ${product.stock} available` : ''}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;