import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiShoppingBag, FiClock, FiTruck, FiCheckCircle } from 'react-icons/fi';
import API from '../../services/api';
import Loader from '../../components/common/Loader';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await API.get('/orders/myorders');
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const statusIcons = {
        'Pending': <FiClock className="text-yellow-500" />,
        'Processing': <FiPackage className="text-blue-500" />,
        'Out for Delivery': <FiTruck className="text-accent-500" />,
        'Delivered': <FiCheckCircle className="text-green-500" />,
    };

    const statusColors = {
        'Pending': 'bg-yellow-100 text-yellow-700',
        'Processing': 'bg-blue-100 text-blue-700',
        'Out for Delivery': 'bg-orange-100 text-orange-700',
        'Delivered': 'bg-green-100 text-green-700',
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                My <span className="text-primary-600">Orders</span>
            </h1>

            {orders.length === 0 ? (
                <div className="text-center py-16">
                    <FiShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700">No orders yet</h2>
                    <p className="text-gray-500 mt-2 mb-6">Start shopping to see your orders here.</p>
                    <Link to="/products" className="btn-primary inline-flex items-center gap-2">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 hover-card">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500 font-mono">#{order._id.slice(-8).toUpperCase()}</span>
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[order.orderStatus]}`}>
                                            {order.orderStatus}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                            day: 'numeric', month: 'short', year: 'numeric',
                                        })}
                                    </p>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600">
                                            {order.items.length} item(s) · {order.items.map(i => i.name).join(', ')}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-primary-600">₹{order.totalAmount.toFixed(2)}</p>
                                    <p className="text-xs text-gray-400 capitalize">{order.paymentMethod}</p>
                                </div>
                            </div>

                            {/* Status Progress */}
                            <div className="mt-4 flex items-center gap-1">
                                {['Pending', 'Processing', 'Out for Delivery', 'Delivered'].map((status, idx) => {
                                    const statusOrder = ['Pending', 'Processing', 'Out for Delivery', 'Delivered'];
                                    const currentIdx = statusOrder.indexOf(order.orderStatus);
                                    const isCompleted = idx <= currentIdx;
                                    const isCurrent = idx === currentIdx;

                                    return (
                                        <div key={status} className="flex items-center flex-1 last:flex-none">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${isCompleted ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400'
                                                } ${isCurrent ? 'ring-2 ring-primary-300' : ''}`}>
                                                {statusIcons[status]}
                                            </div>
                                            {idx < 3 && (
                                                <div className={`flex-1 h-1 mx-1 rounded ${idx < currentIdx ? 'bg-primary-500' : 'bg-gray-200'
                                                    }`}></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;