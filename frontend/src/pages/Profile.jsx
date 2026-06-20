import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchMyOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders/myorders`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          // Token obsolete or 401: clear and bounce
          if (res.status === 401) {
             logout();
             navigate('/login');
          }
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    toast.info('Logged out successfully!');
    logout();
    navigate('/login');
  };

  const formatOrderTotal = (order) => {
    const total = order.totalPrice ?? order.totalAmount;
    return typeof total === 'number' ? total.toFixed(2) : '0.00';
  };

  const getProductName = (product) => {
    if (typeof product.productId === 'object' && product.productId?.name) {
      return product.productId.name;
    }

    return product.name || 'Product';
  };

  if (!user) return null;

  return (
    <div className="containerStyle">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '20px' }}>
        <div>
          <h2 style={{ marginBottom: '10px' }}>My Profile</h2>
          <p style={{ color: '#a1a1aa', fontSize: '1rem', marginBottom: '5px' }}>Name: {user.name}</p>
          <p style={{ color: '#a1a1aa', fontSize: '1rem', marginBottom: '15px', whiteSpace: 'nowrap' }}>Email: {user.email}</p>
          <span className="badgeStyle">Account Type: {user.role.toUpperCase()}</span>
          <br />
          { user.role === "admin" && (
          <Link to="/admin">
            <button className="btn" style={{ background: '#f97316', boxShadow: 'none', marginTop: '10px' }}>Admin Dashboard</button>
          </Link>
        )}
        </div>
        <button onClick={handleLogout} className="btn" style={{ background: '#ef4444', boxShadow: 'none' }}>Logout</button>
      </div>

      <h3 style={{ marginBottom: '15px', fontSize: '1.5rem' }}>Order History</h3>
      {loading ? (
        <p style={{ color: '#a1a1aa' }}>Fetching your orders...</p>
      ) : orders.length === 0 ? (
        <div style={{ background: '#09090b', padding: '30px', borderRadius: '4px', textAlign: 'center', border: '1px solid #27272a' }}>
          <p style={{ color: '#a1a1aa', marginBottom: '15px' }}>You haven't placed any orders yet.</p>
          <Link to="/shop" className="btn">Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '10px' }}>
          {orders
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(order => (
            <div key={order._id} style={{ background: '#09090b', padding: '20px', borderRadius: '4px', border: '1px solid #27272a', display: 'flex',  justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <div>
                <div style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '5px' }}>
                  <span>Products:</span>
                  <div style={{ display: 'grid', gap: '2px' }}>
                    {(order.products || []).map((product) => (
                      <span key={product._id || product.productId?._id || product.productId} style={{ color: '#fff' }}>
                        {getProductName(product)} x {product.quantity}
                      </span>
                    ))}
                  </div>
                </div>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '5px' }}>Placed On: <span style={{ color: '#fff' }}>{new Date(order.createdAt).toLocaleDateString('en-GB')}</span></p>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Total: <span style={{ color: '#fff' }}>${formatOrderTotal(order)}</span></p>
              </div>
              <div>
                <span style={{ 
                  background: order.status === 'delivered' ? 'rgba(16,185,129,0.1)' : order.status === 'shipped' ? 'rgba(59,130,246,0.1)' : order.status === 'pending' ? 'rgba(245,158,11,0.1)' : 'rgba(255,0,0,0.1)',
                  color: order.status === 'delivered' ? '#10b981' : order.status === 'shipped' ? '#3b82f6' : order.status === 'pending' ? '#f59e0b' : '#ff0000',
                  padding: '8px 16px', borderRadius: '4px'
                }}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
