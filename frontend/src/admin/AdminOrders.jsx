import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/orders', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setOrders(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchOrders();
    }, [user, navigate]);

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch(`/api/orders/${id}/status`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                setOrders(orders.map(order => order._id === id ? { ...order, status } : order));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getProductName = (item) => {
        if (typeof item.productId === 'object' && item.productId?.name) {
            return item.productId.name;
        }

        return item.name || 'Product';
    };

    const formatAddress = (address) => {
        if (!address) {
            return 'No address';
        }

        return [
            address.fullName,
            address.street,
            address.city,
            address.postalCode,
            address.country,
        ].filter(Boolean).join(', ');
    };

    const formatMobileNumber = (address) => {
        if (!address?.mobileNumber) {
            return 'No mobile';
        }

        return `${address.mobileNumber}`.trim();
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ marginBottom: '20px' }}>Orders Management</h2>
            <div style={{ overflowX: 'auto' }}>
                <table style={tableStyle}>
                    <thead>
                        <tr style={rowStyle}>
                            <th style={thStyle}>Order ID</th>
                            <th style={thStyle}>User</th>
                            <th style={thStyle}>Products</th>
                            <th style={thStyle}>Mobile</th>
                            <th style={thStyle}>Address</th>
                            <th style={thStyle}>Total</th>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders
                         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                         .map(order => (
                            <tr key={order._id} style={rowStyle}>
                                <td style={tdStyle}>{order._id.substring(0, 8)}...</td>
                                <td style={tdStyle}>{order.user?.name || order.user?.email || 'Unknown'}</td>
                                <td style={tdStyle}>
                                    <div style={listStyle}>
                                        {(order.products || []).map((item) => (
                                            <span key={item._id || item.productId?._id || item.productId}>
                                                {getProductName(item)} x {item.quantity}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td style={tdStyle}>{formatMobileNumber(order.address)}</td>
                                <td style={{ ...tdStyle, minWidth: '260px', lineHeight: '1.5' }}>{formatAddress(order.address)}</td>
                                <td style={tdStyle}>${order.totalPrice.toFixed(2)}</td>
                                <td style={tdStyle}>{new Date(order.createdAt).toLocaleDateString('en-GB')}</td>
                                <td style={tdStyle}>
                                    <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)} style={{ padding: '6px', borderRadius: '4px', backgroundColor: '#27272a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }}>
                                        <option value="pending">Pending</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const containerStyle = {
    maxWidth: '1400px',
    margin: '30px auto',
    padding: '20px',
    background: '#18181b',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.05)',
    color: '#fafafa'
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
};

const rowStyle = {
    borderBottom: '1px solid rgba(255,255,255,0.1)'
};

const thStyle = {
    padding: '15px',
    textAlign: 'left',
    color: '#a1a1aa',
    fontSize: '0.9rem',
};

const tdStyle = {
    padding: '15px',
    textAlign: 'left',
    verticalAlign: 'top',
};

const listStyle = {
    display: 'grid',
    gap: '6px',
    minWidth: '180px',
};

export default AdminOrders;
