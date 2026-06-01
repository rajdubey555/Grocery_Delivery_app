import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiHome } from 'react-icons/fi';
import API from '../../services/api';
import Loader from '../../components/common/Loader';

const OrderSuccess = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await API.get(`/orders/${id}`);
                setOrder(data);
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) return <Loader />;

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 max-w-lg w-full text-center shadow-sm">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheckCircle className="text-5xl text-green-500" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Order Placed Successfully!
                </h1>
                <p className="text-gray-500 mb-8">
                    Thank you for your order. Your groceries will be delivered soon.
                </p>

                {order && (
                    <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-sm">Order ID</span>
                                <span className="font-semibold text-gray-800 text-sm">#{order._id.slice(-8).toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-sm">Date</span>
                                <span className="font-semibold text-gray-800 text-sm">
                                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-sm">Total Amount</span>
                                <span className="font-bold text-primary-600">₹{order.totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-sm">Payment</span>
                                <span className="font-semibold text-gray-800 text-sm capitalize">{order.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-sm">Status</span>
                                <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full">
                                    {order.orderStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/my-orders" className="btn-primary flex items-center justify-center gap-2">
                        <FiPackage /> My Orders
                    </Link>
                    <Link to="/" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl px-6 py-3 flex items-center justify-center gap-2 transition-colors">
                        <FiHome /> Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;