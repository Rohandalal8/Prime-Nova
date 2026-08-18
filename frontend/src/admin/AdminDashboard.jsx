import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import Loader from '../components/Loader';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }

        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/api/analytics`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setStats(data);
                } else {
                    if (res.status === 401) {
                        navigate('/login');
                    }
                    setStats({ totalUsers: 0, totalOrders: 0, totalRevenue: 0, topProducts: 0 });
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, [user, navigate]);

    const cardStyle = {
        background: '#fff8ef',
        borderRadius: '4px',
        border: '1px solid rgba(111,68,40,0.12)',
        padding: '10px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(91,57,34,0.12)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '10px',
    };

    const numberStyle = {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#8b5e3c',
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', marginBottom: '5px' }}>
                <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
                <p style={{ marginBottom: '30px', color: '#7b6550' }}>Overview of key metrics and insights</p>

                {stats ? (
                    <div style={{ display: 'flex', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <div style={{ ...cardStyle }}>
                            <h4 style={{ color: '#7b6550', fontSize: '1rem' }}>Total Users</h4>
                            <div style={numberStyle}>{stats.totalUsers}</div>
                        </div>
                        <div style={{ ...cardStyle }}>
                            <h4 style={{ color: '#7b6550', fontSize: '1rem' }}>Total Orders</h4>
                            <div style={numberStyle}>{stats.totalOrders}</div>
                        </div>
                        <div style={{ ...cardStyle }}>
                            <h4 style={{ color: '#7b6550', fontSize: '1rem' }}>Total Products</h4>
                            <div style={numberStyle}>{stats.totalProducts}</div>
                        </div>
                        <div style={{ ...cardStyle }}>
                            <h4 style={{ color: '#7b6550', fontSize: '1rem' }}>Total Revenue</h4>
                            <div style={numberStyle}>₹{stats.totalRevenue.toFixed(2)}</div>
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '50px 0', color: '#8b5e3c' }}>
                        <Loader />
                    </div>
                )}

                <div style={{ marginTop: '20px', padding: '15px', background: '#fff8ef', border: '1px solid rgba(111,68,40,0.12)', borderRadius: '4px' }}>
                    <h3 style={{ color: '#8b5e3c', marginBottom: '20px' }}>Adminitrative Controls</h3>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <button onClick={() => navigate('/admin/users')} className="btn">Users Directory</button>
                        <button onClick={() => navigate('/admin/products')} className="btn">Manage Products</button>
                        <button onClick={() => navigate('/admin/orders')} className="btn">Manage Orders</button>
                        <button onClick={() => navigate('/admin/add-product')} className="btn">Add New Product</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;