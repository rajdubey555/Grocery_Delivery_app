import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import API from '../../services/api';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const statusOptions = ['Pending', 'Processing', 'Out for Delivery', 'Delivered'];

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await API.get('/orders');
            setOrders(data);
        } catch (error) {
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            await API.put(`/orders/${orderId}/status`, { orderStatus: newStatus });
            toast.success('Order status updated!');
            fetchOrders();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const filteredOrders = orders.filter((order) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            order._id.toLowerCase().includes(term) ||
            order.user?.name?.toLowerCase().includes(term) ||
            order.shippingAddress?.city?.toLowerCase().includes(term)
        );
    });

    const statusColors = {
        'Pending': 'bg-yellow-100 text-yellow-700',
        'Processing': 'bg-blue-100 text-blue-700',
        'Out for Delivery': 'bg-orange-100 text-orange-700',
        'Delivered': 'bg-green-100 text-green-700',
    };

    if (loading) return <Loader />;

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Manage Orders</h1>
                <div className="relative max-w-xs">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search orders..."
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" />
                </div>
            </div>

            <div className="space-y-4">
                {filteredOrders.map((order) => (
                    <div key={order._id} className="bg-white rounded-2xl border border-gray-100 p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs text-gray-500">#{order._id.slice(-8).toUpperCase()}</span>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[order.orderStatus]}`}>
                                        {order.orderStatus}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-primary-600">₹{order.totalAmount.toFixed(2)}</p>
                                <p className="text-xs text-gray-400 capitalize">{order.paymentMethod}</p>
                            </div>
                        </div>

                        {/* Customer Details */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Customer Details</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                                <div><span className="text-gray-400">Name:</span> <span className="text-gray-700">{order.shippingAddress?.name}</span></div>
                                <div><span className="text-gray-400">Mobile:</span> <span className="text-gray-700">{order.shippingAddress?.mobile}</span></div>
                                <div><span className="text-gray-400">City:</span> <span className="text-gray-700">{order.shippingAddress?.city}</span></div>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{order.shippingAddress?.address}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
                        </div>

                        {/* Items */}
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Order Items</h4>
                            <div className="space-y-1">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm text-gray-600">
                                        <span>{item.name} × {item.quantity}</span>
                                        <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Status Update */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Update Status:</span>
                            <select
                                value={order.orderStatus}
                                onChange={(e) => updateStatus(order._id, e.target.value)}
                                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary-400"
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
                {filteredOrders.length === 0 && (
                    <div className="text-center py-10 text-gray-400">No orders found</div>
                )}
            </div>
        </div>
    );
};

export default ManageOrders;