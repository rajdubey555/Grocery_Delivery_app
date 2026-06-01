import { FiUser, FiMail, FiShield } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const AdminSettings = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

            <div className="space-y-6 max-w-2xl">
                {/* Admin Info */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Admin Account</h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-600">
                            <FiUser className="text-gray-400" />
                            <span className="font-medium">{user?.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <FiMail className="text-gray-400" />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <FiShield className="text-gray-400" />
                            <span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full text-xs font-semibold">
                                Administrator
                            </span>
                        </div>
                    </div>
                </div>

                {/* App Info */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Application Info</h2>
                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span>App Name</span>
                            <span className="font-semibold">QuickCart Grocery Delivery</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span>Version</span>
                            <span className="font-semibold">1.0.0</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span>Frontend</span>
                            <span className="font-semibold">React.js + Vite + Tailwind CSS</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span>Backend</span>
                            <span className="font-semibold">Node.js + Express.js</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span>Database</span>
                            <span className="font-semibold">MongoDB</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;