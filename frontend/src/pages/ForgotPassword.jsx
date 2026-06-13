import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/auth.css';

const ForgotPassword = () => {
    let [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    email = location.state?.email || '';

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/auth/forgot-password', {   
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/forgot-password-otp', { state: { email } });
            } else {
                alert(data.message || 'Failed to send OTP');
            }
        } catch (error) {
            console.error('Error during forgot password:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Confirm Email</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                      
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
            </form>
        </div>
    );
}

export default ForgotPassword;
