import React, { useState, useEffect } from 'react';
import { getUser } from '../utils/api';

const ProtectedRoute = ({ children, requiredRole, redirectTo = '/login' }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                const userData = await getUser();
                setUser(userData);

                // Check if user has the required role
                if (requiredRole && userData.role !== requiredRole) {
                    setIsAuthorized(false);
                } else {
                    setIsAuthorized(true);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                setIsAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [requiredRole]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!isAuthorized) {
        // Redirect to login or show unauthorized message
        window.location.href = redirectTo;
        return null;
    }

    return children;
};

export default ProtectedRoute;
