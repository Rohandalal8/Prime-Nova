import React, {useEffect, useState} from 'react';
import ProductCard from '../components/ProductCard';
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
                setProducts(data.slice(0, 8)); // Show only the first 8 products
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
                <h1>Hi, {user?.name || 'Guest'}! Welcome to Prime Basket</h1>
                <p>Your one-stop shop for all your needs. Discover our wide range of products and enjoy seamless shopping experience.</p>
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
        </div>
    );
}

export default Home;