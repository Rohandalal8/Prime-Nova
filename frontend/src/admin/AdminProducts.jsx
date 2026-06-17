import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const AdminProducts = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setProducts(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, [user, navigate]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if (res.ok) {
                setProducts(products.filter(p => p._id !== id));
            }
        }
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '20px auto', padding: '0 20px' }}>
            <h2 style={{ marginBottom: '15px' }}>Products Management</h2>
            <Link to="/admin/add-product" style={{
                display: 'inline-block',
                marginBottom: '20px',
                padding: '10px 20px',
                borderRadius: '4px',
                backgroundColor: '#27272a',
                color: '#fff',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
                + Add New Product
            </Link>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#18181b', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ padding: '12px 25px', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '12px 25px', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '12px 25px', textAlign: 'left' }}>Price</th>
                            <th style={{ padding: '12px 25px', textAlign: 'left' }}>Discount</th>
                            <th style={{ padding: '12px 25px', textAlign: 'left' }}>Category</th>
                            <th style={{ padding: '12px 25px', textAlign: 'left' }}>Stock</th>
                            <th style={{ padding: '12px 25px', textAlign: 'left' }}>Total Sold</th>
                            <th style={{ padding: '12px 25px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...products]
                        .sort((a, b) => b.totalSold - a.totalSold) // Sort by totalSold in descending order
                        .map((p) => (
                            <tr key={p._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '12px 25px' }}>{p._id}</td>
                                <td style={{ padding: '12px 25px' }}>{p.name}</td>
                                <td style={{ padding: '12px 25px' }}>${p.price.toFixed(2)}</td>
                                <td style={{ padding: '12px 25px' }}>{p.discount}%</td>
                                <td style={{ padding: '12px 25px' }}>{p.category}</td>
                                <td style={{ padding: '12px 25px' }}>{p.stock}</td>
                                <td style={{ padding: '12px 25px' }}>{p.totalSold}</td>
                                <td style={{ padding: '12px 25px', minWidth: '180px' }}>
                                    <button style={{
                                        padding: '6px 12px',
                                        borderRadius: '4px',
                                        backgroundColor: '#3b82f6',
                                        color: '#fff',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <Link to={`/admin/edit-product/${p._id}`}> Edit </Link>
                                    </button>
                                    <button onClick={() => handleDelete(p._id)} style={{
                                        marginLeft: '15px',
                                        padding: '6px 12px',
                                        borderRadius: '4px',
                                        backgroundColor: '#ef4444',
                                        color: '#fff',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;
