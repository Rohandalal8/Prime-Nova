import React, {useEffect, useState} from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
const { AuthContext } = require('../context/AuthContext');

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = React.useContext(AuthContext);

    useEffect(() => {
        // Fetch products from the backend API
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProducts(data.slice(-4).reverse()); // Show only the last 4 products
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
            <h2>Recently Added</h2>
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
            <Link to="/shop" className="view-all-link">View All Products</Link>
        </div>
    );
}

export default Home;