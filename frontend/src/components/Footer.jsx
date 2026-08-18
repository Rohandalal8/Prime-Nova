import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer style={{ 
            backgroundColor: '#f8ede16a',
            borderTop: '1px solid rgba(111, 68, 40, 0.12)', 
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
                    <h3 style={{marginBottom: '0', color: '#8b5e3c' }}>Prime Nova</h3>
                    <p style={{ color: '#7b6550', fontSize: '0.7rem', position: 'relative', bottom: '-3px' }}>Private Limited.</p>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '5px' }}>
                    <Link to="/about" style={{ color: '#7b6550', fontSize: '0.9rem' }}>About</Link>
                    {/* <Link to="/return" style={{ color: '#7b6550', fontSize: '0.9rem' }}>Return Policy</Link> */}
                    {/* <Link to="/disclaimer" style={{ color: '#7b6550', fontSize: '0.9rem' }}>Disclaimer</Link> */}
                </div>
                
                <div style={{  color: '#7b6550', fontSize: '0.9rem', marginBottom: '5px' }}>
                    &copy; {new Date().getFullYear()} Prime Nova. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;