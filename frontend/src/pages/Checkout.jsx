import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countryPhoneOptions = [
    { country: 'Afghanistan', code: '+93' },
    { country: 'Albania', code: '+355' },
    { country: 'Algeria', code: '+213' },
    { country: 'Andorra', code: '+376' },
    { country: 'Angola', code: '+244' },
    { country: 'Argentina', code: '+54' },
    { country: 'Armenia', code: '+374' },
    { country: 'Australia', code: '+61' },
    { country: 'Austria', code: '+43' },
    { country: 'Azerbaijan', code: '+994' },
    { country: 'Bahamas', code: '+1' },
    { country: 'Bahrain', code: '+973' },
    { country: 'Bangladesh', code: '+880' },
    { country: 'Belarus', code: '+375' },
    { country: 'Belgium', code: '+32' },
    { country: 'Belize', code: '+501' },
    { country: 'Benin', code: '+229' },
    { country: 'Bhutan', code: '+975' },
    { country: 'Bolivia', code: '+591' },
    { country: 'Bosnia and Herzegovina', code: '+387' },
    { country: 'Botswana', code: '+267' },
    { country: 'Brazil', code: '+55' },
    { country: 'Brunei', code: '+673' },
    { country: 'Bulgaria', code: '+359' },
    { country: 'Burkina Faso', code: '+226' },
    { country: 'Burundi', code: '+257' },
    { country: 'Cambodia', code: '+855' },
    { country: 'Cameroon', code: '+237' },
    { country: 'Canada', code: '+1' },
    { country: 'Cape Verde', code: '+238' },
    { country: 'Central African Republic', code: '+236' },
    { country: 'Chad', code: '+235' },
    { country: 'Chile', code: '+56' },
    { country: 'China', code: '+86' },
    { country: 'Colombia', code: '+57' },
    { country: 'Comoros', code: '+269' },
    { country: 'Congo', code: '+242' },
    { country: 'Costa Rica', code: '+506' },
    { country: 'Croatia', code: '+385' },
    { country: 'Cuba', code: '+53' },
    { country: 'Cyprus', code: '+357' },
    { country: 'Czech Republic', code: '+420' },
    { country: 'Denmark', code: '+45' },
    { country: 'Djibouti', code: '+253' },
    { country: 'Dominican Republic', code: '+1' },
    { country: 'Ecuador', code: '+593' },
    { country: 'Egypt', code: '+20' },
    { country: 'El Salvador', code: '+503' },
    { country: 'Estonia', code: '+372' },
    { country: 'Ethiopia', code: '+251' },
    { country: 'Finland', code: '+358' },
    { country: 'France', code: '+33' },
    { country: 'Gabon', code: '+241' },
    { country: 'Gambia', code: '+220' },
    { country: 'Georgia', code: '+995' },
    { country: 'Germany', code: '+49' },
    { country: 'Ghana', code: '+233' },
    { country: 'Greece', code: '+30' },
    { country: 'Guatemala', code: '+502' },
    { country: 'Guinea', code: '+224' },
    { country: 'Guyana', code: '+592' },
    { country: 'Haiti', code: '+509' },
    { country: 'Honduras', code: '+504' },
    { country: 'Hong Kong', code: '+852' },
    { country: 'Hungary', code: '+36' },
    { country: 'Iceland', code: '+354' },
    { country: 'India', code: '+91' },
    { country: 'Indonesia', code: '+62' },
    { country: 'Iran', code: '+98' },
    { country: 'Iraq', code: '+964' },
    { country: 'Ireland', code: '+353' },
    { country: 'Israel', code: '+972' },
    { country: 'Italy', code: '+39' },
    { country: 'Jamaica', code: '+1' },
    { country: 'Japan', code: '+81' },
    { country: 'Jordan', code: '+962' },
    { country: 'Kazakhstan', code: '+7' },
    { country: 'Kenya', code: '+254' },
    { country: 'Kuwait', code: '+965' },
    { country: 'Kyrgyzstan', code: '+996' },
    { country: 'Laos', code: '+856' },
    { country: 'Latvia', code: '+371' },
    { country: 'Lebanon', code: '+961' },
    { country: 'Lesotho', code: '+266' },
    { country: 'Liberia', code: '+231' },
    { country: 'Libya', code: '+218' },
    { country: 'Lithuania', code: '+370' },
    { country: 'Luxembourg', code: '+352' },
    { country: 'Macau', code: '+853' },
    { country: 'Madagascar', code: '+261' },
    { country: 'Malaysia', code: '+60' },
    { country: 'Maldives', code: '+960' },
    { country: 'Mali', code: '+223' },
    { country: 'Malta', code: '+356' },
    { country: 'Mauritania', code: '+222' },
    { country: 'Mauritius', code: '+230' },
    { country: 'Mexico', code: '+52' },
    { country: 'Moldova', code: '+373' },
    { country: 'Monaco', code: '+377' },
    { country: 'Mongolia', code: '+976' },
    { country: 'Montenegro', code: '+382' },
    { country: 'Morocco', code: '+212' },
    { country: 'Mozambique', code: '+258' },
    { country: 'Myanmar', code: '+95' },
    { country: 'Namibia', code: '+264' },
    { country: 'Nepal', code: '+977' },
    { country: 'Netherlands', code: '+31' },
    { country: 'New Zealand', code: '+64' },
    { country: 'Nicaragua', code: '+505' },
    { country: 'Niger', code: '+227' },
    { country: 'Nigeria', code: '+234' },
    { country: 'North Korea', code: '+850' },
    { country: 'Norway', code: '+47' },
    { country: 'Oman', code: '+968' },
    { country: 'Pakistan', code: '+92' },
    { country: 'Panama', code: '+507' },
    { country: 'Paraguay', code: '+595' },
    { country: 'Peru', code: '+51' },
    { country: 'Philippines', code: '+63' },
    { country: 'Poland', code: '+48' },
    { country: 'Portugal', code: '+351' },
    { country: 'Qatar', code: '+974' },
    { country: 'Romania', code: '+40' },
    { country: 'Russia', code: '+7' },
    { country: 'Rwanda', code: '+250' },
    { country: 'Saudi Arabia', code: '+966' },
    { country: 'Senegal', code: '+221' },
    { country: 'Serbia', code: '+381' },
    { country: 'Singapore', code: '+65' },
    { country: 'Slovakia', code: '+421' },
    { country: 'Slovenia', code: '+386' },
    { country: 'South Africa', code: '+27' },
    { country: 'South Korea', code: '+82' },
    { country: 'Spain', code: '+34' },
    { country: 'Sri Lanka', code: '+94' },
    { country: 'Sudan', code: '+249' },
    { country: 'Sweden', code: '+46' },
    { country: 'Switzerland', code: '+41' },
    { country: 'Syria', code: '+963' },
    { country: 'Taiwan', code: '+886' },
    { country: 'Tajikistan', code: '+992' },
    { country: 'Tanzania', code: '+255' },
    { country: 'Thailand', code: '+66' },
    { country: 'Togo', code: '+228' },
    { country: 'Trinidad and Tobago', code: '+1' },
    { country: 'Tunisia', code: '+216' },
    { country: 'Turkey', code: '+90' },
    { country: 'Turkmenistan', code: '+993' },
    { country: 'UAE', code: '+971' },
    { country: 'Uganda', code: '+256' },
    { country: 'Ukraine', code: '+380' },
    { country: 'United Kingdom', code: '+44' },
    { country: 'United States', code: '+1' },
    { country: 'Uruguay', code: '+598' },
    { country: 'Uzbekistan', code: '+998' },
    { country: 'Venezuela', code: '+58' },
    { country: 'Vietnam', code: '+84' },
    { country: 'Yemen', code: '+967' },
    { country: 'Zambia', code: '+260' },
    { country: 'Zimbabwe', code: '+263' },
  ];

  const [address, setAddress] = useState({
    fullName: '',
    mobileNumber: '',
    countryCode: '+91',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleCountryCodeChange = (e) => {
    setAddress((prev) => ({
      ...prev,
      countryCode: e.target.value,
    }));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const buildOrderProducts = () => cartItems.map((item) => ({
    productId: item.productId || item._id,
    quantity: item.quantity || item.qty || 1,
    price: item.price,
  }));

  const handlePayment = async () => {
    try {
      const orderRes = await fetch('/api/payment/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice })
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        // Razorpay unconfigured exception handler
        const fallback = window.confirm("Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?");
        if (fallback) {
          return bypassPayment();
        } else {
          return alert("Payment failed to initialize");
        }
      }

      const options = {
        key: 'rzp_test_dummykey123', // Student dummy fallback
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShopNest',
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
              alert('Order saving failed');
            }
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: `${address.countryCode}${address.mobileNumber}`
        },
        theme: {
          color: '#f97316'
        }
      };
      
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  const bypassPayment = async () => {
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
        paymentId: 'bypass_txn_' + Date.now()
      })
    });
    if (saveOrderRes.ok) {
      dispatch(clearCart());
      navigate('/ordersuccess');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      navigate('/login');
      return;
    }
    handlePayment();
  };

  return (
    <div className="checkout-container" style={{textAlign: 'center', padding: '30px'}}>
      <h2>Checkout</h2>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping Address</h3>
          <input type="text" placeholder="Full Name" required value={address.fullName} onChange={(e) => setAddress({...address, fullName: e.target.value})} />
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select
              required
              value={address.countryCode}
              onChange={handleCountryCodeChange}
              style={{ width: '60px', padding: '15px 10px', borderRadius: '8px', background: '#070707d2', color: '#fafafa', border: '1px solid #3f3f46', fontWeight: '600', outline: 'none' }}
            >
              <option value="" disabled>Select Code</option>
              {countryPhoneOptions.map((option) => (
                <option key={`${option.country}-${option.code}`} value={option.code}>
                  {option.code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              placeholder="Mobile Number"
              required
              value={address.mobileNumber}
              onChange={(e) => setAddress({ ...address, mobileNumber: e.target.value })}
              style={{ flex: 1 }}
            />
          </div>
          <input type="text" placeholder="Street" required value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />
          <input type="text" placeholder="City" required value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
          <input type="text" placeholder="Postal Code" required value={address.postalCode} onChange={(e) => setAddress({...address, postalCode: e.target.value})} />
          <input
            type="text"
            placeholder="Country"
            required
            value={address.country}
            onChange={(e) => setAddress({ ...address, country: e.target.value })}
          />
          <div className="checkout-summary">
            <h4>Total to Pay: ₹{totalPrice.toFixed(2)}</h4>
            <button type="submit" className="btn">Pay Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;