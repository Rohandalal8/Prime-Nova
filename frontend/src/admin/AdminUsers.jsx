import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/auth/users', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setUsers(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, [user, navigate]);

    return (
        <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 20px'}}>
            <h2 style={{ marginBottom: '20px' }}>Users Directory</h2>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#18181b', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ padding: '12px 25px', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '12px 25px', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '12px 25px', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: '12px 25px', textAlign: 'left' }}>Role</th>
                            <th style={{ padding: '12px 25px', textAlign: 'left' }}>Join Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '12px 25px' }}>{u._id}</td>
                                <td style={{ padding: '12px 25px' }}>{u.name}</td>
                                <td style={{ padding: '12px 25px' }}>{u.email}</td>
                                <td style={{ padding: '12px 25px' }}>
                                    <span style={{
                                        background: u.role === 'admin' ? 'rgba(249,115,22,0.1)' : 'rgba(255,255,255,0.1)',
                                        color: u.role === 'admin' ? '#f97316' : '#fff',
                                        padding: '6px 12px', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold'
                                    }}>
                                        {u.role}
                                    </span>
                                </td>
                                <td style={{ padding: '12px 25px' }}>{new Date(u.createdAt).toLocaleDateString('en-GB')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminUsers;
