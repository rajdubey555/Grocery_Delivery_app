import { useState } from 'react';
import { FiUser, FiPhone, FiMail, FiLock, FiSave } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
    const { user, updateProfile, changePassword } = useAuth();
    const [editing, setEditing] = useState(false);
    const [profileForm, setProfileForm] = useState({
        name: user?.name || '',
        mobile: user?.mobile || '',
    });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        const result = await updateProfile(profileForm);
        setSaving(false);
        if (result.success) setEditing(false);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
            alert('New passwords do not match!');
            return;
        }
        setSaving(true);
        const result = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
        setSaving(false);
        if (result.success) {
            setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
            setShowPasswordForm(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                My <span className="text-primary-600">Profile</span>
            </h1>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {user?.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                            <p className="text-sm text-gray-500">{user?.role === 'admin' ? 'Administrator' : 'Customer'}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setEditing(!editing)}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                        {editing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                {editing ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                            <div className="relative">
                                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="tel" value={profileForm.mobile} onChange={(e) => setProfileForm({ ...profileForm, mobile: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400" />
                            </div>
                        </div>
                        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-70">
                            <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                ) : (
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-600">
                            <FiMail className="text-gray-400" />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <FiPhone className="text-gray-400" />
                            <span>{user?.mobile}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
                    <button
                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                        {showPasswordForm ? 'Cancel' : 'Change'}
                    </button>
                </div>

                {showPasswordForm && (
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="password" value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} required
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="password" value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} required minLength={6}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="password" value={passwordForm.confirmNewPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })} required
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400" />
                            </div>
                        </div>
                        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-70">
                            <FiSave /> {saving ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;