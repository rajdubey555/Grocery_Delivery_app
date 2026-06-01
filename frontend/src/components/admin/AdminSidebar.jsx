import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiGrid, FiFolder, FiBox, FiShoppingBag, FiUsers, FiSettings, FiLogOut,
  FiChevronLeft, FiChevronRight, FiMenu, FiShoppingCart,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { path: '/admin', icon: <FiGrid />, label: 'Dashboard' },
  { path: '/admin/categories', icon: <FiFolder />, label: 'Categories' },
  { path: '/admin/products', icon: <FiBox />, label: 'Products' },
  { path: '/admin/orders', icon: <FiShoppingBag />, label: 'Orders' },
  { path: '/admin/users', icon: <FiUsers />, label: 'Users' },
  { path: '/admin/settings', icon: <FiSettings />, label: 'Settings' },
];

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-xl shadow-md"
      >
        <FiMenu className="text-xl" />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } ${collapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          <Link to="/admin" className={`flex items-center gap-2 ${collapsed ? 'justify-center w-full' : ''}`}>
            <FiShoppingCart className="text-2xl text-primary-500" />
            {!collapsed && (
              <span className="text-lg font-extrabold text-primary-600">
                Quick<span className="text-accent-500">Cart</span>
              </span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:block text-gray-400 hover:text-gray-600 p-1"
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>

        {/* User Info */}
        <div className={`px-4 py-3 border-b border-gray-100 ${collapsed ? 'text-center' : ''}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold mx-auto">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          {!collapsed && (
            <div className="mt-2 text-center">
              <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
              <p className="text-xs text-primary-600 bg-primary-50 rounded-full px-2 py-0.5 inline-block mt-1">Admin</p>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${isActive
                    ? 'bg-primary-50 text-primary-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : ''}
              >
                <span className="text-xl">{item.icon}</span>
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 w-full transition-colors ${collapsed ? 'justify-center' : ''
              }`}
          >
            <FiLogOut className="text-xl" />
            {!collapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;