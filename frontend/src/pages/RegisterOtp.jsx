import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../styles/auth.css';

const RegisterOtp = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const expiry = Number(localStorage.getItem('otpExpiry'));

        if (!expiry) {
            navigate('/register');
            return;
        }

        const updateTimer = () => {
            const remaining = Math.max(
                0,
                Math.floor((expiry - Date.now()) / 1000)
            );

            if (remaining <= 0) {
                clearInterval(interval);

                localStorage.removeItem('otpExpiry');

                toast.error('OTP expired. Please register again.');

                setTimeout(() => {
                    navigate('/register');
                }, 2000);
            }
        };
        
        const interval = setInterval(updateTimer, 1000);

        updateTimer();

        return () => clearInterval(interval);
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/register-otp`, {   
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.removeItem('otpExpiry');

                toast.success('Registered successfully!');
                login(data);
                navigate('/');
            } else {
                toast.error(data.message || 'Registration failed');

                if (
                    data.message?.toLowerCase().includes('expired') ||
                    data.message?.toLowerCase().includes('not found')
                ) {
                    localStorage.removeItem('otpExpiry');

                    setTimeout(() => {
                        navigate('/register');
                    }, 2000);
                }
            }
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Verify OTP</h2>
                <p style={{ textAlign: 'left',marginTop: '-10px' }}>
                    Please enter the OTP sent to your email to complete registration.
                </p>
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

export default RegisterOtp;
