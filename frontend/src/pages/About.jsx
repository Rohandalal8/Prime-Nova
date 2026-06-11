import React from 'react';

const About = () => {
    const containerStyle = {
        padding: '40px',
        maxWidth: '900px',
        margin: '0 auto',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        marginTop: '30px',
        marginBottom: '30px'
    };

    const socialBtnStyle = {
        display: 'inline-block',
        margin: '10px',
        padding: '10px 20px',
        borderRadius: '8px',
        backgroundColor: '#27272a',
        color: '#fff',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    };

    return (
        <div style={containerStyle}>
            <img src="/assets/logo.png" alt="@Rohan" style={{ 
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
            }}>About Me</h2>
            <h3 style={{ 
                fontSize: '1.5rem',  
                color: '#f97316', 
                marginBottom: '15px' 
            }}>Rohan</h3>
            <p style={{ 
                fontSize: '1.2rem', 
                color: '#a1a1aa', 
                margin: '0 auto 30px auto',
                lineHeight: '1.8',
                maxWidth: '600px', 
            }}>
                <strong>Join the community and grow together! </strong>
                Welcome to my platform where we build, deploy, and scale highly engineered systems.
            </p>
            <div style={{ 
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                flexWrap: 'wrap',
            }}>
                <a href="https://rohan.com" target="_blank" rel="noreferrer" style={socialBtnStyle}>🌐 Website</a>
                <a href="https://youtube.com/@rohan" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle, background: 'rgba(239, 68, 68, 0.2)', borderColor: '#ef4444', color: '#ef4444' }}>📺 YouTube</a>
                <a href="https://instagram.com/rohndalal" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle, background: 'rgba(236, 72, 153, 0.2)', borderColor: '#ec4899', color: '#ec4899' }}>📸 Instagram</a>
                <a href="https://www.linkedin.com/in/rohan" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle, background: 'rgba(59, 130, 246, 0.2)', borderColor: '#3b82f6', color: '#3b82f6' }}>💼 LinkedIn</a>
                <a href="https://x.com/rohan" target="_blank" rel="noreferrer" style={socialBtnStyle}>✖️ X (Twitter)</a>
                <a href="https://whatsapp.com/channel/0029VbAWGE5ICVfcjjKTAS0B" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle, background: 'rgba(16, 185, 129, 0.2)', borderColor: '#10b981', color: '#10b981' }}>💬 WhatsApp</a>
                <a href="https://linktr.ee/shivanshvasu" target="_blank" rel="noreferrer" style={socialBtnStyle}>🔗 Linktree</a>
            </div>
        </div>
    );
}

export default About;