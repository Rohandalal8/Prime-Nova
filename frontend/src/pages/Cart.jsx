import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart, updateCartStock } from '../redux/cartSlice';
import '../styles/cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getItemId = (item) => item.productId || item._id;

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  useEffect(() => {
    const syncCartStock = async () => {
      if (cartItems.length === 0) return;

      const ids = cartItems.map(item => getItemId(item));

      const res = await fetch('/api/products/cart-stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids })
      });

      const products = await res.json();

      products.forEach(product => {
        const cartItem = cartItems.find(
          item => getItemId(item) === product._id
        );

        if (!cartItem) return;

        // Out of stock => remove
        if (product.stock <= 0) {
        dispatch(removeFromCart(getItemId(cartItem)));
        return;
        }

        // Update stock in cart
        if (cartItem.qty > product.stock) {
          dispatch(
            addToCart({
              ...cartItem,
              qty: product.stock,
              stock: product.stock
            })
          );
          return;
        }

        dispatch(
          updateCartStock({
            productId: String(product._id),
            stock: product.stock
          })
        );
      });
    };
    syncCartStock();
  }, [cartItems, dispatch]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/shop" style={{ color: '#007bff' }}>Go Shopping</Link></p>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={getItemId(item)} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                  <div className="qty-controls">
                    <button 
                    onClick={() => handleUpdateQty(item, item.qty - 1)}
                    disabled={item.qty <= 1}
                    style={{ opacity: item.qty <= 1 ? 0.5 : 1, cursor: item.qty <= 1 ? 'not-allowed' : 'pointer' }}
                    >
                    -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => handleUpdateQty(item, item.qty + 1)}
                      disabled={Number.isFinite(item.stock) && item.qty >= item.stock}
                      style={{ opacity: Number.isFinite(item.stock) && item.qty >= item.stock ? 0.5 : 1, cursor: Number.isFinite(item.stock) && item.qty >= item.stock ? 'not-allowed' : 'pointer' }}
                    >
                      +
                    </button>
                  </div>
                  {Number.isFinite(item.stock) && (
                    <p style={{ marginTop: '-15px', padding: '10px 0', color: item.stock > 0 ? '#f97316' : '#ef4444', fontSize: '0.6rem'}}>
                        {item.stock > 0 && item.stock <= 5 ? `Only ${item.stock} available` : item.stock > 5 ? `` : 'Temporarily Out of Stock'}
                    </p>
                  )}
                  <button onClick={() => handleRemove(getItemId(item))} className="btn-remove">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            {cartItems.map((item) => (
              <div key={getItemId(item)} className="cart-summary-item">
                <span>{item.name} x {item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="cart-summary-item">
              <span>Taxes:</span>
              <span>${(totalPrice * 0.08).toFixed(2)}</span>
            </div>
            <div className="cart-summary-item">
              <span>Shipping:</span>
              <span>$5.00</span>
            </div>
            <div className="cart-summary-total">
              <strong>Total:</strong>
              <strong>${(totalPrice + totalPrice * 0.08 + 5).toFixed(2)}</strong>
            </div>
            <button onClick={() => navigate('/checkout')} className="btn btn-checkout">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;