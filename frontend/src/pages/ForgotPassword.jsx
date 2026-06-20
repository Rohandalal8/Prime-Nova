import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../config';
import '../styles/auth.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let [email, setEmail] = useState(
        location.state?.email || ''
    );
    const [loading, setLoading] = useState(false);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/forgot-password`, {   
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem(
                    'otpExpiry',
                    (Date.now() + 120000).toString()
                );
                navigate('/forgot-password-otp', { state: { email } });
            } else {
                toast.error(data.message || 'Failed to send OTP');
            }
        } catch (error) {
            console.error('Error during forgot password:', error);
            toast.error('An error occurred. Please try again.');
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
