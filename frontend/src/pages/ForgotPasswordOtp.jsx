import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/auth.css';

const ForgotPassword = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/auth/forgot-password-otp', {   
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp }),
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/reset-password', { state: { email } });
            } else {
                toast.error(data.message || 'Failed to verify OTP');
            }
        } catch (error) {
            console.error('Error during OTP verification:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Verify OTP</h2>
                <p style={{ textAlign: 'left',marginTop: '-10px' }} >Please enter the OTP sent to your email to complete the password reset process.</p>
                <input
                    type="string"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />      
                <button type="submit" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
            </form>
        </div>
    );
}

export default ForgotPassword;
