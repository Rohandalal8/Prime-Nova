import React from 'react';

const About = () => {
    const containerStyle = {
        width: '95%',
        padding: '20px',
        maxWidth: '900px',
        margin: '20px auto',
        borderRadius: '4px',
        textAlign: 'center',
    };

    const socialBtnStyle = {
        display: 'inline-block',
        padding: '10px 10px',
        borderRadius: '4px',
        backgroundColor: '#d9c3a7',
        color: '#2f2116',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(111, 68, 40, 0.18)',
        width: '45%'
    };

    return (
        <div style={containerStyle}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
            <img src="/PrimeLogo.png" alt="Prime Nova" style={{ 
                width: '30px', 
                height: '30px', 
                borderRadius: '4px',
                marginBottom: '15px', 
                objectFit: 'cover', 
                border: '1px solid #8b5e3c',
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4)',
                textAlign: 'left',
            }} /> 
            <h2 style={{ 
                fontSize: '1.5rem'
            }}><span style={{ background: '#8b5e3c', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Prime Nova </span> - About Us</h2>
            </div>
            <p style={{ 
                fontSize: '1rem', 
                color: '#7b6550', 
                margin: '0 auto 30px auto',
                lineHeight: '1.8',
                textAlign: 'left' 
            }}>
                Get started with Prime Nova!
                We are your destination for unique handcrafted products made with passion and creativity. We believe every handmade item tells a story, reflecting the skill, tradition, and dedication of talented artisans.
                <br /> <br />
                Our mission is to connect customers with authentic, high-quality handcrafted goods while supporting artisans and small businesses. From home décor and accessories to gifts and lifestyle products, every piece in our collection is carefully selected for its craftsmanship and uniqueness.
                <br /> <br />
                At Prime Nova, we celebrate creativity, sustainability, and the beauty of handmade work. Thank you for supporting artisans and choosing products made with care.
            </p>
            <div style={{ 
                marginTop: '15px',
                display: 'flex',
                justifyContent: 'center',
                gap: '15px',
                flexWrap: 'wrap'
            }}>
                <a href="https://rohan.com" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle,background: 'rgba(249, 115, 22, 0.2)', borderColor: '#8b5e3c', color: '#8b5e3c' }}>🌐 Website</a>
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