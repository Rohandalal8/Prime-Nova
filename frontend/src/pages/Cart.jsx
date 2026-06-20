import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart, updateCartStock } from '../redux/cartSlice';
import { API_URL } from '../config';
import '../styles/product.css';
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

      const res = await fetch(`${API_URL}/api/products/cart-stock`, {
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

        // Update cart
        if (cartItem.qty > product.stock) {
          dispatch(
            addToCart({
              ...cartItem,
              qty: product.stock,
              stock: product.stock,
              discount: product.discount
            })
          );
          return;
        }

        dispatch(
          updateCartStock({
            productId: String(product._id),
            stock: product.stock,
            discount: product.discount
          })
        );
      });
    };
    syncCartStock();
  }, [cartItems, dispatch]);

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalDiscount = cartItems.reduce((acc, item) => acc + ((item.price * item.qty * item.discount) / 100), 0);
  const totalDiscountedPrice = totalPrice - totalDiscount;
  const tax = totalDiscountedPrice * 0.08;
  const shipping = 5;
  const finalTotal = totalDiscountedPrice + tax + shipping;

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
                  {item.discount > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                            <p className="product-price" style={{ marginBottom: '0' }}>
                                ${(item.price - (item.price * item.discount) / 100).toFixed(2)}
                            </p>

                            <p className="product-discounted-price">
                                ${item.price.toFixed(2)}
                            </p>
                        
                            <span className="product-discount">
                                {item.discount}% OFF
                            </span>
                        </div>
                    ) : (
                        <p className="product-price" style={{ marginBottom: '0' }}>
                            ${item.price.toFixed(2)}
                        </p>
                    )}
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
                    <button onClick={() => handleRemove(getItemId(item))} className="btn-remove">Remove</button>
                  </div>
                  {Number.isFinite(item.stock) && (
                    <p style={{ marginTop: '-15px', padding: '10px 0', color: item.stock > 0 ? '#f97316' : '#ef4444', fontSize: '0.6rem'}}>
                        {item.stock > 0 && item.stock <= 5 ? `Only ${item.stock} available` : item.stock > 5 ? `` : 'Temporarily Out of Stock'}
                    </p>
                  )}
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
              <span>Discount:</span>
              <span>-${(totalDiscount).toFixed(2)}</span>
            </div>
            <div className="cart-summary-item">
              <span>Tax:</span>
              <span>${(tax).toFixed(2)}</span>
            </div>
            <div className="cart-summary-item">
              <span>Shipping:</span>
              <span>${(shipping).toFixed(2)}</span>
            </div>
            <div className="cart-summary-total">
              <span>Total:</span>
              <span>${(finalTotal).toFixed(2)}</span>
            </div>
            <button onClick={() => navigate('/checkout')} className="btn btn-checkout">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;