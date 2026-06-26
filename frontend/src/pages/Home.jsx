import React, {useEffect, useState} from 'react';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '../config';

const Home = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [dealProducts, setDealProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = React.useContext(AuthContext);

    useEffect(() => {
        // Fetch products from the backend API
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/api/products`);
                const data = await response.json();

                const isMobile = window.innerWidth <= 768;
                const limit = isMobile ? 4 : 5;

                // latest products
                setLatestProducts(data.slice(-limit).reverse()); // Show only the last 4 products on mobile, 5 on desktop

                // popular products
                const sortedProducts = [...data].sort((a, b) => (b.totalSold || 0) - (a.totalSold || 0));

                setPopularProducts(sortedProducts.slice(0, limit)); // Show only the top 4 products on mobile, 5 on desktop

                // deal products
                const dealProducts = data.filter(p => p.discount > 0).sort((a, b) => b.discount - a.discount);
                setDealProducts(dealProducts.slice(0, limit)); // Show only the top 4 deal products on mobile, 5 on desktop

            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="main-context">
            <div className="hero-banner">
                <h1>Hi, {user?.name || 'Guest'}! Welcome to Prime Nova</h1>
                <p>Prime Nova is a marketplace dedicated to handcrafted products created by skilled artisans. We bring together quality, creativity, and authenticity, offering unique handmade items that add a personal touch to everyday life while supporting talented makers and small businesses.</p>
            </div>
            <h2>Trending Now</h2>
            {loading ? (
                <Loader />
            ) : (
                <div className="product-grid" >
                    {popularProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
            <h2 style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #27272a'}}>Fresh Picks</h2>
            {loading ? (
                <Loader />
            ) : (
                <div className="product-grid" >
                    {latestProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
            <h2 style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #27272a'}}>Hot Deals</h2>
            {loading ? (
                <Loader />
            ) : (
                <div className="product-grid" >
                    {dealProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
            <Link to="/shop" className="view-all-link">View All Products</Link>
        </div>
    );
}

export default Home;