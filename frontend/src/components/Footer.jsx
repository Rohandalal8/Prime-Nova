import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer style={{ 
            backgroundColor: '#09090b6a',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
            padding: '15px', 
            marginTop: 'auto' 
        }}>
            <div style={{ 
                maxWidth: '1400px', 
                margin: '0 auto', 
                display: 'flex', 
                flexWrap: 'wrap', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                gap: '20 px' 
            }}>
                <div>
                    <h3 style={{ marginBottom: '10px', color: '#f97316' }}>Prime Basket</h3>
                    <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Premium E-commerce platform.</p>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <Link to="/about" style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>About</Link>
                    <Link to="/return" style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Return Policy</Link>
                    <Link to="/disclaimer" style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Disclaimer</Link>
                </div>
                
                <div style={{  color: '#a1a1aa', fontSize: '0.9rem' }}>
                    &copy; {new Date().getFullYear()} Prime Basket. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;