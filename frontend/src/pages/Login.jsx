import React, {useState, useContext} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../styles/auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Login successful!');
                login(data);
                navigate('/');
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <p style={{ textAlign: 'left', marginTop: '-15px', padding: '5px' }}>
                    <Link to="/forgot-password" state={{ email }}>Forgot Password?</Link>
                </p>
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </form>
        </div>
    );
}

export default Login;