import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer style={{ 
            backgroundColor: '#09090b6a',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
            padding: '20px', 
            marginTop: 'auto',
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
                <div style={{ display: 'flex',alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                    <h3 style={{marginBottom: '0', color: '#f97316' }}>Prime Nova</h3>
                    <p style={{ color: '#a1a1aa', fontSize: '0.7rem', position: 'relative', bottom: '-3px' }}>Private Limited.</p>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '5px' }}>
                    <Link to="/about" style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>About</Link>
                    <Link to="/return" style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Return Policy</Link>
                    <Link to="/disclaimer" style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Disclaimer</Link>
                </div>
                
                <div style={{  color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '5px' }}>
                    &copy; {new Date().getFullYear()} Prime Nova. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;