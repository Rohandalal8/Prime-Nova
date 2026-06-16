import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

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
        const res = await fetch('/api/orders/myorders', {
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '30px', marginBottom: '30px' }}>
        <div>
          <h2 style={{ marginBottom: '10px' }}>My Profile</h2>
          <p style={{ color: '#a1a1aa', fontSize: '1rem', marginBottom: '5px' }}><strong>Name:</strong> {user.name}</p>
          <p style={{ color: '#a1a1aa', fontSize: '1rem', marginBottom: '15px', whiteSpace: 'nowrap' }}><strong>Email:</strong> {user.email}</p>
          <span className="badgeStyle">Account Type: {user.role.toUpperCase()}</span>
        </div>
        <button onClick={handleLogout} className="btn" style={{ background: '#ef4444', boxShadow: 'none' }}>Logout</button>
      </div>

      <h3 style={{ color: '#f97316', marginBottom: '20px', fontSize: '1.5rem' }}>Order History</h3>
      {loading ? (
        <p style={{ color: '#a1a1aa' }}>Fetching your orders...</p>
      ) : orders.length === 0 ? (
        <div style={{ background: '#09090b', padding: '30px', borderRadius: '8px', textAlign: 'center', border: '1px solid #27272a' }}>
          <p style={{ color: '#a1a1aa', marginBottom: '15px' }}>You haven't placed any orders yet.</p>
          <Link to="/shop" className="btn">Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {orders
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(order => (
            <div key={order._id} style={{ background: '#09090b', padding: '20px', borderRadius: '12px', border: '1px solid #27272a', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <div>
                <div style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '8px' }}>
                  <strong style={{ color: '#fff' }}>Products:</strong>
                  <div style={{ display: 'grid', gap: '4px', marginTop: '6px' }}>
                    {(order.products || []).map((product) => (
                      <span key={product._id || product.productId?._id || product.productId} style={{ color: '#fff' }}>
                        {getProductName(product)} x {product.quantity}
                      </span>
                    ))}
                  </div>
                </div>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '5px' }}>Placed On: <span style={{ color: '#fff' }}>{new Date(order.createdAt).toLocaleDateString('en-GB')}</span></p>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Total: <strong style={{ color: '#10b981' }}>${formatOrderTotal(order)}</strong></p>
              </div>
              <div>
                <span style={{ 
                  background: order.status === 'delivered' ? 'rgba(16,185,129,0.1)' : order.status === 'shipped' ? 'rgba(59,130,246,0.1)' : order.status === 'pending' ? 'rgba(245,158,11,0.1)' : 'rgba(255,0,0,0.1)',
                  color: order.status === 'delivered' ? '#10b981' : order.status === 'shipped' ? '#3b82f6' : order.status === 'pending' ? '#f59e0b' : '#ff0000',
                  padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' 
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
