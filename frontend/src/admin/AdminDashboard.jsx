import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
                const res = await fetch('/api/analytics', {
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
        background: '#18181b',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.05)',
        padding: '25px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '10px',
    };

    const numberStyle = {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: '#f97316',
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', marginBottom: '5px' }}>
                <img src="/PrimeLogo.png" alt="Prime Logo" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', filter: 'drop-shadow(0 0px 10px rgba(249,115,22,0.3))' }} />
                <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
                <p style={{ marginBottom: '30px', color: '#a1a1aa' }}>Overview of key metrics and insights</p>

                {stats ? (
                    <div style={{ display: 'flex', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                        <div style={{ ...cardStyle }}>
                            <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}>Total Users</h4>
                            <div style={numberStyle}>{stats.totalUsers}</div>
                        </div>
                        <div style={{ ...cardStyle }}>
                            <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}>Total Orders</h4>
                            <div style={numberStyle}>{stats.totalOrders}</div>
                        </div>
                        <div style={{ ...cardStyle }}>
                            <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}>Total Products</h4>
                            <div style={numberStyle}>{stats.totalProducts}</div>
                        </div>
                        <div style={{ ...cardStyle }}>
                            <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}>Total Revenue</h4>
                            <div style={numberStyle}>${stats.totalRevenue.toFixed(2)}</div>
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '50px 0', color: '#f97316' }}>
                        <p style={{ color: '#a1a1aa' }}>Loading analytics...</p>
                    </div>
                )}

                <div style={{ marginTop: '40px', padding: '30px', background: '#18181b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                    <h3 style={{ color: '#f97316', marginBottom: '25px' }}>Adminitrative Controls</h3>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <button onClick={() => navigate('/admin/users')} className="btn" style={{ background: '#2f2f38', boxShadow: 'none' }}>Users Directory</button>
                        <button onClick={() => navigate('/admin/products')} className="btn" style={{ background: '#2f2f38', boxShadow: 'none' }}>Manage Products</button>
                        <button onClick={() => navigate('/admin/orders')} className="btn" style={{ background: '#2f2f38', boxShadow: 'none' }}>Manage Orders</button>
                        <button onClick={() => navigate('/admin/add-product')} className="btn" style={{ background: '#2f2f38', boxShadow: 'none' }}>Add New Product</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;