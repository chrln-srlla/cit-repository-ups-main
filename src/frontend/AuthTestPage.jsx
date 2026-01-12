import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCapstoneContext } from '../contexts/CapstoneProjectsContext';

export default function AuthTestPage() {
    const { user, loading, login, logout } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await login({ username, password });
        if (result) {
            alert('Login successful!');
        } else {
            alert('Login failed!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading authentication...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">
                    Authentication Context Test Page
                </h1>

                {/* Auth Status */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
                    <div className="space-y-2">
                        <p>
                            <strong>Status:</strong>{' '}
                            <span className={user ? 'text-green-600' : 'text-red-600'}>
                                {user ? 'Logged In' : 'Not Logged In'}
                            </span>
                        </p>
                        {user && (
                            <>
                                <p>
                                    <strong>Username:</strong> {user.username}
                                </p>
                                <p>
                                    <strong>Email:</strong> {user.email}
                                </p>
                                <p>
                                    <strong>Role:</strong> {user.role}
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* Login Form */}
                {!user ? (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Test Login</h2>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Enter any username"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Enter any password"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                            >
                                Login (Mock)
                            </button>
                        </form>
                        <p className="text-sm text-gray-500 mt-4">
                            Note: This is a mock login. Any username/password will work.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Actions</h2>
                        <button
                            onClick={logout}
                            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                )}

                {/* Browser Console Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-blue-900">
                        Testing in Browser Console
                    </h2>
                    <div className="space-y-2 text-sm text-blue-800">
                        <p>Open browser console (F12) and try these commands:</p>
                        <code className="block bg-white p-2 rounded mt-2">
                            localStorage.getItem('auth')
                        </code>
                        <p className="text-xs text-blue-600">
                            → Check stored authentication data
                        </p>
                        <code className="block bg-white p-2 rounded mt-2">
                            localStorage.removeItem('auth')
                        </code>
                        <p className="text-xs text-blue-600">
                            → Clear authentication (then refresh page)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
