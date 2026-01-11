import { useAuth } from "../hooks/useAuth";
import { LogOut, User, Mail, Calendar } from "lucide-react";

const Settings = () => {
    const { user, isLoading, logout, isAuthenticated } = useAuth();
    // console.log(user)

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                Loading settings...
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <div className="flex items-center justify-center h-64 text-red-500">
                Unauthorized
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Settings</h1>

            {/* Profile Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt="avatar"
                            className="w-20 h-20 rounded-full object-cover border border-gray-300"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border border-gray-300">
                            <User className="w-8 h-8 text-gray-400" />
                        </div>
                    )}
                </div>

                {/* User Info */}
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900">{user.fullName}</h2>
                    <p className="text-sm text-gray-500">@{user.username}</p>

                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {user.email}
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            Joined: {new Date(user.createdAt).toLocaleDateString()}
                        </div>

                        {user.lastLogin && (
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                Last login: {new Date(user.lastLogin).toLocaleString()}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Account Actions */}
            <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4 text-gray-800">Account</h3>

                <button
                    onClick={() => logout()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition"
                >
                    <LogOut className="w-4 h-4" />
                    Sign out
                </button>
            </div>
        </div>
    );
};

export default Settings;
