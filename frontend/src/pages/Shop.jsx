import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/product.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('selling'); // Default sorting by most selling

  const categories = [...new Set(products.map(product => product.category))];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === '' ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt) - new Date(a.createdAt);

      case 'discount':
        return (b.discount || 0) - (a.discount || 0);

      case 'selling':
        return (b.totalSold || 0) - (a.totalSold || 0);

      default:
        return 0;
    }
  });

  return (
    <div className="shop-container" style={{ padding: '15px' }}>
      <h2>All Products</h2>
      <div className="search-sort-container">
        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="search-bar"
          >
            <option value="">All Categories</option>

            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="search-bar"
          >
            <option value="selling">Best Sellers</option>
            <option value="discount">Top Deals</option>
            <option value="recent">New Arrivals</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="product-grid">
          {sortedProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;