import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
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

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }

        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_URL}/api/products/${id}`);
                const data = await res.json();
                if (res.ok) {
                    setFormData({
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        discount: data.discount || 0,
                        category: data.category,
                        stock: data.stock,
                    });
                } else {
                    toast.error(data.message || 'Product not found.');
                    navigate('/admin/products');
                }
            } catch (error) {
                console.error(error);
                toast.error('An error occurred while loading the product.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, navigate, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('discount', formData.discount || 0);
        data.append('category', formData.category);
        data.append('stock', formData.stock);
        if (images) {
            images.forEach((image) => {
                data.append('images', image);
            });
        }

        try {
            const res = await fetch(`${API_URL}/api/products/${id}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${user.token}` },
                body: data,
            });
            const responseData = await res.json();
            
            if (res.ok) {
                toast.success('Product updated successfully!');
                navigate('/admin/products');
            } else {
                toast.error(responseData.message || 'Failed to update product.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while updating the product.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p style={{ textAlign: 'center', marginTop: '40px', color: '#a1a1aa' }}>Loading product...</p>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', borderRadius: '4px', backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 style={{ marginBottom: '20px' }}>Edit Product</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input name="name" type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle} required />
                <textarea name="description" placeholder="Product Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={inputStyle} required />
                <input name="price" type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} style={inputStyle} required />
                <input name="discount" type="number" placeholder="Discount (%)" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} style={inputStyle} />
                <input name="category" type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={inputStyle} required />
                <input name="stock" type="number" placeholder="Stock Quantity" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} style={inputStyle} required />
                <input type="file" accept="image/*" multiple onChange={(e) => setImages(Array.from(e.target.files))} style={{ ...inputStyle, padding: '5px' }} />
                <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>You can upload multiple images for the product. (Max 12)</span>
                <button type="submit"  style={buttonStyle}>
                    {loading ? 'Updating...' : 'Update Product'}
                </button>
            </form>
        </div>
    );
}

const inputStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: '#27272a',
    color: '#fff',
};

const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '4px',
    backgroundColor: '#f97316',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
};

export default EditProduct;
