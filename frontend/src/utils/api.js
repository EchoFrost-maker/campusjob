const API_BASE_URL = 'http://127.0.0.1:8000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
        ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }
    return response.json();
};

export const login = (email, password) => apiRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
});

export const register = (name, email, password, role) => apiRequest('/users/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role }),
});

export const getUser = () => apiRequest('/users/user');

export const logout = () => apiRequest('/users/logout', { method: 'POST' });

export const getAdminDashboard = () => apiRequest('/admin/dashboard');
