import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiFolder } from 'react-icons/fi';
import API from '../../services/api';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: '', image: null });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await API.get('/categories');
            setCategories(data);
        } catch (error) {
            toast.error('Failed to fetch categories');
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
            if (form.image) formData.append('image', form.image);

            if (editing) {
                await API.put(`/categories/${editing._id}`, formData);
                toast.success('Category updated!');
            } else {
                await API.post('/categories', formData);
                toast.success('Category created!');
            }
            setShowModal(false);
            setEditing(null);
            setForm({ name: '', image: null });
            fetchCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (cat) => {
        setEditing(cat);
        setForm({ name: cat.name, image: null });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;
        try {
            await API.delete(`/categories/${id}`);
            toast.success('Category deleted!');
            fetchCategories();
        } catch (error) {
            toast.error('Failed to delete category');
        }
    };

    if (loading) return <Loader />;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
                <button onClick={() => { setEditing(null); setForm({ name: '', image: null }); setShowModal(true); }}
                    className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
                    <FiPlus /> Add Category
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr className="text-left text-gray-500">
                                <th className="px-6 py-4 font-medium">Image</th>
                                <th className="px-6 py-4 font-medium">Name</th>
                                <th className="px-6 py-4 font-medium">Created</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => (
                                <tr key={cat._id} className="border-t border-gray-50 hover:bg-gray-50/50">
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-2xl">
                                            {cat.image ? (
                                                <img src={`http://localhost:5000${cat.image}`} alt={cat.name} className="w-full h-full object-cover rounded-xl" />
                                            ) : <FiFolder className="text-primary-400" />}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-800">{cat.name}</td>
                                    <td className="px-6 py-4 text-gray-500 text-xs">
                                        {new Date(cat.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => handleEdit(cat)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                                                <FiEdit2 />
                                            </button>
                                            <button onClick={() => handleDelete(cat._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr><td colSpan="4" className="py-10 text-center text-gray-400">No categories found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold">{editing ? 'Edit Category' : 'Add Category'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FiX /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image (optional)</label>
                                <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-primary-50 file:text-primary-600" />
                            </div>
                            <button type="submit" disabled={submitting} className="btn-primary w-full py-2.5 disabled:opacity-70">
                                {submitting ? 'Saving...' : editing ? 'Update Category' : 'Add Category'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCategories;