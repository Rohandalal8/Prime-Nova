import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import '../styles/phoneInput.css';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    fullName: '',
    mobileNumber: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [isPaying, setIsPaying] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => {
    const discountedPrice = item.price - (item.price * item.discount) / 100;
    return acc + discountedPrice * item.qty;
  }, 0);

  const tax = subtotal * 0.08;
  const shipping = 5;

  const totalPrice = subtotal + tax + shipping;

  const buildOrderProducts = () => cartItems.map((item) => ({
    productId: item.productId || item._id,
    quantity: item.quantity || item.qty || 1,
    price: item.price,
  }));

  if (isPaying) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Processing Payment...</h2>
        <p>Please do not close or refresh the page</p>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      const orderRes = await fetch('/api/payment/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice , currency: 'INR' })
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        toast.error(orderData.message || 'Unable to create payment order');
        setIsPaying(false);
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Prime Nova',
        image: window.location.origin + "/PrimeLogo.png",
        description: 'Test Transaction',
        order_id: orderData.id,

        handler: async function (response) {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });

          if (verifyRes.ok) {
            const saveOrderRes = await fetch('/api/orders', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
              body: JSON.stringify({
                products: buildOrderProducts(),
                totalPrice,
                address,
                paymentId: response.razorpay_payment_id
              })
            });

            if (saveOrderRes.ok) {
              dispatch(clearCart());
              navigate('/ordersuccess');
            } else {
              toast.error('Order saving failed');
              setIsPaying(false);
            }
          } else {
            toast.error('Payment verification failed');
            setIsPaying(false);
          }
        },

        modal: {
          ondismiss: function() {
            toast.info('Payment cancelled');
            setIsPaying(false);
          }
        },

        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: `${address.mobileNumber}`
        },
        theme: {
          color: '#f97316'
        }
      };
      
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      toast.error('Payment initialization error: ' + error.message);
      console.error('Payment initialization error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !user.verified) {
      toast.error("Please login first");
      navigate('/login');
      return;
    }
    setIsPaying(true);
    handlePayment();
  };


  return (
    <div className="checkout-container" style={{textAlign: 'center', padding: '20px'}}>
      <h2>Checkout</h2>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping Address</h3>
          <input type="text" placeholder="Full Name" required value={address.fullName} onChange={(e) => setAddress({...address, fullName: e.target.value})} />
          <PhoneInput
            country={'in'}
            enableSearch={true}
            placeholder="Mobile Number"
            required
            value={address.mobileNumber}
            onChange={(value, countryData) => {
              const localNumber = value.slice(countryData.dialCode.length);
              setAddress({ ...address, mobileNumber: `+${countryData.dialCode} ${localNumber}` })
            }}
          />
          <input type="text" placeholder="Street" required value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />
          <input type="text" placeholder="City" required value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
          <input type="text" placeholder="Postal Code" required value={address.postalCode} onChange={(e) => setAddress({...address, postalCode: e.target.value})} />
          <input type="text" placeholder="Country" required value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />
          <div className="checkout-summary">
            <h4>Total to Pay: ${totalPrice.toFixed(2)}</h4>
            <button type="submit" className="btn"> Pay Now </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
