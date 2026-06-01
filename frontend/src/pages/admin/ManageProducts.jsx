import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiShoppingBag } from 'react-icons/fi';
import API from '../../services/api';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        name: '', category: '', description: '', price: '', quantity: '', image: null,
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [prodRes, catRes] = await Promise.all([
                API.get('/products'),
                API.get('/categories'),
            ]);
            setProducts(prodRes.data);
            setCategories(catRes.data);
        } catch (error) {
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('category', form.category);
            formData.append('description', form.description);
            formData.append('price', form.price);
            formData.append('quantity', form.quantity);
            if (form.image) formData.append('image', form.image);

            if (editing) {
                await API.put(`/products/${editing._id}`, formData);
                toast.success('Product updated!');
            } else {
                await API.post('/products', formData);
                toast.success('Product created!');
            }
            setShowModal(false);
            setEditing(null);
            setForm({ name: '', category: '', description: '', price: '', quantity: '', image: null });
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (prod) => {
        setEditing(prod);
        setForm({
            name: prod.name,
            category: prod.category?._id || '',
            description: prod.description || '',
            price: prod.price,
            quantity: prod.quantity,
            image: null,
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await API.delete(`/products/${id}`);
            toast.success('Product deleted!');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    if (loading) return <Loader />;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
                <button onClick={() => { setEditing(null); setForm({ name: '', category: '', description: '', price: '', quantity: '', image: null }); setShowModal(true); }}
                    className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
                    <FiPlus /> Add Product
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr className="text-left text-gray-500">
                                <th className="px-6 py-4 font-medium">Product</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Price</th>
                                <th className="px-6 py-4 font-medium">Stock</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((prod) => (
                                <tr key={prod._id} className="border-t border-gray-50 hover:bg-gray-50/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                                                {prod.image ? (
                                                    <img src={`http://localhost:5000${prod.image}`} alt={prod.name} className="w-full h-full object-cover rounded-lg" />
                                                ) : <FiShoppingBag className="text-primary-400" />}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{prod.name}</p>
                                                <p className="text-xs text-gray-400 truncate max-w-[200px]">{prod.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full font-medium">
                                            {prod.category?.name || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-800">₹{prod.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${prod.quantity > 10 ? 'bg-green-100 text-green-700' :
                                            prod.quantity > 0 ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            {prod.quantity > 0 ? `${prod.quantity} units` : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => handleEdit(prod)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                                                <FiEdit2 />
                                            </button>
                                            <button onClick={() => handleDelete(prod._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr><td colSpan="5" className="py-10 text-center text-gray-400">No products found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg my-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold">{editing ? 'Edit Product' : 'Add Product'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FiX /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400">
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    rows="2" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 resize-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required min="0"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                    <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} required min="0"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                                <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-primary-50 file:text-primary-600" />
                            </div>
                            <button type="submit" disabled={submitting} className="btn-primary w-full py-2.5 disabled:opacity-70">
                                {submitting ? 'Saving...' : editing ? 'Update Product' : 'Add Product'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProducts;