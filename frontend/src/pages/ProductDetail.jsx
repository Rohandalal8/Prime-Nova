import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import '../styles/product.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [addReview, setAddReview] = useState(false);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const { user } = React.useContext(AuthContext);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state?.cart?.cartItems || state?.cart?.items || []);
    const navigate = useNavigate();

    const fetchProduct = useCallback(async () => {
        try {
            const response = await fetch(`/api/products/${id}`);
            const data = await response.json();
            setProduct(data);
            setSelectedImage(data.imageUrl?.[0]);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/products/${product._id}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
                body: JSON.stringify({ rating, comment }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Review submitted successfully!');
                setAddReview(false);
                fetchProduct(); // Refetch product to get updated reviews and ratings
                // Optionally update the product's reviews array or refetch the product
            } else {
                toast.error(data.message || 'Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    if (loading) return <div style={{ textAlign: 'center', margin: '100px', color: '#f97316' }}>Loading product details...</div>;

    if (!product) return <div style={{ textAlign: 'center', margin: '100px', color: '#ef4444' }}>Product not found.</div>;

    const discountedPrice = product.price - ((product.price * product.discount) / 100);

    return (
        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '15px' }}>

            <div className="product-detail" style={{ filter: addReview ? 'blur(4px)' : 'none', pointerEvents: addReview ? 'none' : 'auto' }}>
                <div className="detail-images">
                    <div>
                        <img src={selectedImage} alt={product.name} className="detail-image" />
                    </div>

                    <div className="detail-thumbnails">
                        {product.imageUrl?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`${product.name} ${index + 1}`}
                                className="detail-thumbnail"
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </div>

                <div className="detail-info">
                    <h2 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>{product.name}</h2>

                    <p>
                        {product.avgRating.toFixed(1)} ★ {product.numReviews}
                    </p>

                    {product.discount > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                            <span className="product-price" style={{ fontSize: '1.5rem' }}>
                                ${discountedPrice.toFixed(2)}
                            </span>

                            <span className="product-discounted-price" style={{ fontSize: '1rem' }}>
                                ${product.price.toFixed(2)}
                            </span>

                            <span className="product-discount" style={{ display: 'inline-block', fontSize: '1rem' }}>
                                {product.discount}% OFF
                            </span>
                        </div>
                    ) : (
                        <span className="product-price" style={{ fontSize: '1.5rem' }}>
                            ${product.price.toFixed(2)}
                        </span>
                    )}

                    <div style={{ marginBottom: '10px' }}>
                        <h4 style={{ color: '#fff', marginBottom: '5px' }}>Product Description</h4>
                        <p>
                            {product.description}
                        </p>
                    </div>

                    <p style={{ color: product.stock > 0 ? '#f97316' : '#ef4444' }}>
                        {product.stock > 0 && product.stock <= 5 ? `Only ${product.stock} available` : ''}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button onClick={handleAddToCart} disabled={product.stock <= 0} className="btn" style={{ width: '100%', background: 'none', color: '#f97316', border: '1px solid #f97316', opacity: product.stock <= 0 ? 0.5 : 1, cursor: product.stock <= 0 ? 'not-allowed' : 'pointer' }}>
                            {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>

                        <button onClick={handleBuyNow} disabled={product.stock <= 0} className="btn" style={{ width: '100%', opacity: product.stock <= 0 ? 0.5 : 1, cursor: product.stock <= 0 ? 'not-allowed' : 'pointer' }}>
                            {product.stock <= 0 ? 'Out of Stock' : 'Buy Now'}
                        </button>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <h4 style={{ color: '#fff', marginBottom: '5px' }}>Customer Reviews : {product.avgRating.toFixed(1)} ★</h4>
                        <p>
                            Based on {product.numReviews} customer ratings
                        </p>
                    </div>

                    <button onClick={() => setAddReview(true)} disabled={!user} className="btn" style={{ width: '50%', opacity: !user ? 0.5 : 1, cursor: !user ? 'not-allowed' : 'pointer' }}>
                        {user ? 'Add Review' : 'Login to Review'}
                    </button>

                    <div style={{ marginTop: '20px' }}>
                        <h3 style={{ marginBottom: '15px' }}>Recent Reviews</h3>
                        {product?.reviews?.length > 0 ? (
                            (showAllReviews
                                ? product.reviews
                                : product.reviews.slice(0, 5)
                            ).map((review) => (
                                <div
                                    key={review._id}
                                    style={{
                                        padding: '10px',
                                        borderBottom: '1px solid #27272a'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                                        <h3 style={{ marginBottom: '0px' }}>
                                            {review.userId?.name}
                                        </h3>

                                        <span style={{ color: '#87878e', fontSize: '0.7rem' }}>
                                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <div>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star}>
                                                {star <= review.rating ? '★' : '☆'}
                                            </span>
                                        ))}
                                    </div>

                                    <p>{review.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet</p>
                        )}
                    </div>

                    {product?.reviews?.length > 5 && (
                        <div
                            className="view-all-link"
                            onClick={() => setShowAllReviews(!showAllReviews)}
                        >
                            {showAllReviews ? 'Show Less' : 'Show All Reviews'}
                        </div>
                    )}
                </div>
            </div>

            {addReview && (
                <div className="auth-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <h2>Submit Review</h2>

                        <h2 onClick={() => setAddReview(false)} style={{ position: 'absolute', right: 20, cursor: 'pointer' }}>X</h2>

                        <input
                            type="number"
                            placeholder="Rating (1-5)"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                            min="1"
                            max="5"
                        />

                        <textarea
                            placeholder="Comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />

                        <button type="submit">Submit Review</button>
                    </form>
                </div>
            )}
        </div>


    );
}

export default ProductDetail;