import React from 'react';

const About = () => {
    const containerStyle = {
        padding: '40px',
        maxWidth: '900px',
        margin: '0 auto',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        textAlign: 'center',
        marginTop: '30px',
        marginBottom: '30px'
    };

    const socialBtnStyle = {
        display: 'inline-block',
        margin: '10px',
        padding: '10px 10px',
        borderRadius: '8px',
        backgroundColor: '#27272a',
        color: '#fff',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    };

    return (
        <div style={containerStyle}>
            <img src="/PrimeLogo.png" alt="Prime Nova" style={{ 
                width: '180px', 
                height: '180px', 
                borderRadius: '50%', 
                objectFit: 'cover', 
                border: '4px solid #f97316',
                marginBottom: '20px',
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4)' 
            }} />
            <h2 style={{ 
                fontSize: '2.5rem',  
                color: '#fff', 
                marginBottom: '10px' 
            }}>About Us</h2>
            <h3 style={{ 
                fontSize: '1.5rem',  
                color: '#f97316', 
                marginBottom: '15px' 
            }}>Prime Nova</h3>
            <p style={{ 
                fontSize: '1rem', 
                color: '#a1a1aa', 
                margin: '0 auto 30px auto',
                lineHeight: '1.8',
                maxWidth: '600px',
                textAlign: 'left', 
            }}>
                <strong>Get started with Prime Nova! </strong>
                We are your destination for unique handcrafted products made with passion and creativity. We believe every handmade item tells a story, reflecting the skill, tradition, and dedication of talented artisans.
                <br /> <br />
                Our mission is to connect customers with authentic, high-quality handcrafted goods while supporting artisans and small businesses. From home décor and accessories to gifts and lifestyle products, every piece in our collection is carefully selected for its craftsmanship and uniqueness.
                <br /> <br />
                At Prime Nova, we celebrate creativity, sustainability, and the beauty of handmade work. Thank you for supporting artisans and choosing products made with care.
            </p>
            <div style={{ 
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                flexWrap: 'wrap',
            }}>
                <a href="https://rohan.com" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle,background: 'rgba(249, 115, 22, 0.2)', borderColor: '#f97316', color: '#f97316' }}>🌐 Website</a>
                <a href="https://youtube.com/@rohan" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle, background: 'rgba(239, 68, 68, 0.2)', borderColor: '#ef4444', color: '#ef4444' }}>📺 YouTube</a>
                <a href="https://instagram.com/rohndalal" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle, background: 'rgba(236, 72, 153, 0.2)', borderColor: '#ec4899', color: '#ec4899' }}>📸 Instagram</a>
                <a href="https://www.linkedin.com/in/rohan" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle, background: 'rgba(59, 130, 246, 0.2)', borderColor: '#3b82f6', color: '#3b82f6' }}>💼 LinkedIn</a>
                <a href="https://x.com/rohan" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle }}>✖️ X (Twitter)</a>
                <a href="https://whatsapp.com/channel/0029VbAWGE5ICVfcjjKTAS0B" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle, background: 'rgba(16, 185, 129, 0.2)', borderColor: '#10b981', color: '#10b981' }}>💬 WhatsApp</a>
                <a href="https://linktr.ee/shivanshvasu" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle }}>🔗 Linktree</a>
            </div>
        </div>
    );
}

export default About;