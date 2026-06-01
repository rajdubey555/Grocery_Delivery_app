import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCreditCard, FiDollarSign, FiSmartphone, FiTruck, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';
import toast from 'react-hot-toast';

const Payment = () => {
    const navigate = useNavigate();
    const { cart, grandTotal, clearCart } = useCart();
    const { user } = useAuth();
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [processing, setProcessing] = useState(false);

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    const shippingInfo = JSON.parse(localStorage.getItem('quickcart_shipping') || '{}');
    if (!shippingInfo.name) {
        navigate('/checkout');
        return null;
    }

    const paymentOptions = [
        { id: 'cod', title: 'Cash on Delivery', icon: <FiTruck className="text-xl" />, desc: 'Pay when you receive your order' },
        { id: 'upi', title: 'UPI Payment', icon: <FiSmartphone className="text-xl" />, desc: 'Google Pay, PhonePe, Paytm' },
        { id: 'credit', title: 'Credit Card', icon: <FiCreditCard className="text-xl" />, desc: 'Visa, Mastercard, RuPay' },
        { id: 'debit', title: 'Debit Card', icon: <FiDollarSign className="text-xl" />, desc: 'All major bank debit cards' },
    ];

    const handlePayment = async () => {
        if (!user) {
            toast.error('Please login to place order');
            navigate('/login');
            return;
        }

        setProcessing(true);
        try {
            const { data } = await API.post('/orders', {
                items: cart,
                shippingAddress: shippingInfo,
                paymentMethod,
            });

            toast.success('Order placed successfully!');
            clearCart();
            localStorage.removeItem('quickcart_shipping');
            navigate(`/order-success/${data._id}`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button onClick={() => navigate('/checkout')} className="flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-6">
                <FiArrowLeft /> Back
            </button>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                Payment
            </h1>

            <div className="space-y-6">
                {/* Payment Methods */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Select Payment Method</h2>
                    <div className="space-y-3">
                        {paymentOptions.map((option) => (
                            <label
                                key={option.id}
                                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === option.id
                                        ? 'border-primary-500 bg-primary-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value={option.id}
                                    checked={paymentMethod === option.id}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-5 h-5 accent-primary-500"
                                />
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === option.id ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {option.icon}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{option.title}</p>
                                    <p className="text-sm text-gray-500">{option.desc}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Total Amount</span>
                            <span className="text-2xl font-extrabold text-primary-600">₹{grandTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Payment Method</span>
                            <span className="font-medium capitalize">{paymentMethod}</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handlePayment}
                    disabled={processing}
                    className="btn-accent w-full py-4 text-lg disabled:opacity-70"
                >
                    {processing ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Processing...
                        </span>
                    ) : (
                        `Pay ₹${grandTotal.toFixed(2)}`
                    )}
                </button>
            </div>
        </div>
    );
};

export default Payment;