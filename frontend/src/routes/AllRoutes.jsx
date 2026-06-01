import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';

// User Pages
import Home from '../pages/user/Home';
import Login from '../pages/user/Login';
import Register from '../pages/user/Register';
import Categories from '../pages/user/Categories';
import Products from '../pages/user/Products';
import ProductDetail from '../pages/user/ProductDetail';
import Cart from '../pages/user/Cart';
import Checkout from '../pages/user/Checkout';
import Payment from '../pages/user/Payment';
import OrderSuccess from '../pages/user/OrderSuccess';
import MyOrders from '../pages/user/MyOrders';
import Profile from '../pages/user/Profile';

// Admin Pages
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageCategories from '../pages/admin/ManageCategories';
import ManageProducts from '../pages/admin/ManageProducts';
import ManageOrders from '../pages/admin/ManageOrders';
import ManageUsers from '../pages/admin/ManageUsers';
import AdminSettings from '../pages/admin/AdminSettings';

// Scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// Protected Route wrapper (requires authentication)
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <Loader fullScreen />;
    if (!user) return <Navigate to="/login" replace />;
    return children;
};

// Admin Route wrapper (requires admin role)
const AdminRoute = ({ children }) => {
    const { user, loading, isAdmin } = useAuth();
    if (loading) return <Loader fullScreen />;
    if (!user) return <Navigate to="/admin/login" replace />;
    if (!isAdmin) return <Navigate to="/" replace />;
    return children;
};

const AllRoutes = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                {/* User Routes */}
                <Route element={<UserLayout />}>
                    {/* Public */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />

                    {/* Protected (requires login) */}
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
                    <Route path="/order-success/:id" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
                    <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                </Route>

                {/* Admin Login (Public - no layout wrapper) */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Admin Routes (Protected - requires admin role) */}
                <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                    <Route path="/admin/categories" element={<AdminRoute><ManageCategories /></AdminRoute>} />
                    <Route path="/admin/products" element={<AdminRoute><ManageProducts /></AdminRoute>} />
                    <Route path="/admin/orders" element={<AdminRoute><ManageOrders /></AdminRoute>} />
                    <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
                    <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
                </Route>

                {/* 404 Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};

export default AllRoutes;