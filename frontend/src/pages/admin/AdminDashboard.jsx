import { useState, useEffect } from 'react';
import { FiBox, FiFolder, FiUsers, FiShoppingBag, FiTrendingUp } from 'react-icons/fi';
import API from '../../services/api';
import Loader from '../../components/common/Loader';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalProducts: 0, totalCategories: 0, totalUsers: 0, totalOrders: 0 });
    const [recentOrders, setRecentOrders] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const [statsRes, ordersRes, usersRes] = await Promise.all([
                    API.get('/users/stats'),
                    API.get('/orders'),
                    API.get('/users'),
                ]);
                setStats(statsRes.data);
                setRecentOrders(ordersRes.data.slice(0, 5));
                setRecentUsers(usersRes.data.filter(u => u.role === 'user').slice(0, 5));
            } catch (error) {
                console.error('Error fetching dashboard:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) return <Loader />;

    const statCards = [
        { label: 'Total Products', value: stats.totalProducts, icon: <FiBox />, color: 'bg-blue-500' },
        { label: 'Categories', value: stats.totalCategories, icon: <FiFolder />, color: 'bg-primary-500' },
        { label: 'Total Users', value: stats.totalUsers, icon: <FiUsers />, color: 'bg-accent-500' },
        { label: 'Total Orders', value: stats.totalOrders, icon: <FiShoppingBag />, color: 'bg-purple-500' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((card, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 hover-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{card.label}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
                            </div>
                            <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                                {card.icon}
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
                            <FiTrendingUp /> <span>+12% from last month</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-500 border-b border-gray-100">
                                    <th className="pb-3 font-medium">Order ID</th>
                                    <th className="pb-3 font-medium">Customer</th>
                                    <th className="pb-3 font-medium">Amount</th>
                                    <th className="pb-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order._id} className="border-b border-gray-50">
                                        <td className="py-3 text-gray-800 font-mono text-xs">#{order._id.slice(-6).toUpperCase()}</td>
                                        <td className="py-3 text-gray-600">{order.user?.name || 'N/A'}</td>
                                        <td className="py-3 font-semibold">₹{order.totalAmount}</td>
                                        <td className="py-3">
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                    order.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-blue-100 text-blue-700'
                                                }`}>{order.orderStatus}</span>
                                        </td>
                                    </tr>
                                ))}
                                {recentOrders.length === 0 && (
                                    <tr><td colSpan="4" className="py-6 text-center text-gray-400">No orders yet</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Users */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Users</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-500 border-b border-gray-100">
                                    <th className="pb-3 font-medium">Name</th>
                                    <th className="pb-3 font-medium">Email</th>
                                    <th className="pb-3 font-medium">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentUsers.map((user) => (
                                    <tr key={user._id} className="border-b border-gray-50">
                                        <td className="py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-gray-800">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-gray-500">{user.email}</td>
                                        <td className="py-3 text-gray-400 text-xs">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                {recentUsers.length === 0 && (
                                    <tr><td colSpan="3" className="py-6 text-center text-gray-400">No users yet</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;