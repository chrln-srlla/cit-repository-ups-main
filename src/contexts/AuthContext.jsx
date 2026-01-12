import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Stores user data if logged in
    const [loading, setLoading] = useState(true); // Indicates if auth status is being checked

    useEffect(() => {
        const checkAuthStatus = async () => {
            console.log('checking auth status', loading);

            const storedUser = localStorage.getItem('auth');
            let currentUser = null;
            if (storedUser) {
                currentUser = JSON.parse(storedUser);
                setUser(currentUser);
            }

            // Since there's no backend, we'll just check if there's a stored user
            if (!currentUser) {
                setUser(null);
                setLoading(false);
                return;
            }

            // Mock validation - in real app, this would verify with backend
            console.log('Setting Current user', currentUser);
            setUser(currentUser);
            setLoading(false);
        };
        checkAuthStatus();
    }, []);

    const login = async (credentials) => {
        try {
            // Mock login - in real app, this would call backend API
            const mockUser = {
                username: credentials.username,
                email: credentials.email || `${credentials.username}@cbsua.edu.ph`,
                role: 'Admin'
            };

            console.log('Mock login successful', mockUser);
            setUser(mockUser);
            localStorage.setItem('auth', JSON.stringify(mockUser));
            return mockUser;
        } catch (e) {
            console.error('Login error', e);
            return null;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
