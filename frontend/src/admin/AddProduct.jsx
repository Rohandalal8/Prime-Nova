import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        discount: '',
        category: '',
        stock: '',
    });
    const [images, setImages] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!user || user.role !== 'admin') {
        navigate('/');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!images || images.length === 0) {
            alert('Please upload an image for the product.');
            return;
        }
        setLoading(true);
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('discount', formData.discount);
        data.append('category', formData.category);
        data.append('stock', formData.stock);
        images.forEach((image, index) => {
            data.append('images', image);
        });

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { Authorization: `Bearer ${user.token}` },
                body: data,
            });
            const resposeData = await res.json();

            if (res.ok) {
                toast.success('Product added successfully!');
                navigate('/admin/products');
            } else {
                toast.error(resposeData.message || 'Failed to add product.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while adding the product.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', borderRadius: '4px', backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 style={{ marginBottom: '20px' }}>Add New Product</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text"
                    placeholder="Product Name"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={inputStyle}
                />
                <textarea
                    placeholder="Product Description"
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={inputStyle}
                />
                <input
                    type="number"
                    placeholder="Price"
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={inputStyle}
                />
                <input
                    type="number"
                    placeholder="Discount (%)"
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    style={inputStyle}
                />
                <input
                    type="text"
                    placeholder="Category"
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={inputStyle}
                />
                <input
                    type="number"
                    placeholder="Stock Quantity"
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    style={inputStyle}
                />
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImages(Array.from(e.target.files))}
                    style={{ ...inputStyle, padding: '5px' }}
                />
                <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>You can upload multiple images for the product. (Max 8)</span>
                <button type="submit" disabled={loading} style={{
                    padding: '10px 20px',
                    borderRadius: '4px',
                    backgroundColor: '#f97316',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                }}>
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

const inputStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: '#27272a',
    color: '#fff',
};

export default AddProduct;