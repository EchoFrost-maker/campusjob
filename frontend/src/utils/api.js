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
        const errorText = await response.text();
        let errorMessage = `API request failed: ${response.status} ${response.statusText}`;
        try {
            const errorData = JSON.parse(errorText);
            if (errorData.error) {
                errorMessage += ` - ${errorData.error}`;
            } else if (errorData.message) {
                errorMessage += ` - ${errorData.message}`;
            }
        } catch (e) {
            // If not JSON, use the text
            if (errorText) {
                errorMessage += ` - ${errorText}`;
            }
        }
        throw new Error(errorMessage);
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

// New API functions added for full backend connection

export const getJobs = () => apiRequest('/jobs');

export const getJob = (id) => apiRequest(`/jobs/${id}`);


export const postJob = (jobData) => apiRequest('/jobs', {
    method: 'POST',
    body: JSON.stringify(jobData),
});

export const updateJob = (id, jobData) => apiRequest(`/jobs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(jobData),
});

export const deleteJob = (id) => apiRequest(`/jobs/${id}`, {
    method: 'DELETE',
});

export const getApplications = () => apiRequest('/applications');

export const postApplication = (applicationData) => apiRequest('/applications', {
    method: 'POST',
    body: JSON.stringify(applicationData),
});

export const getPayments = () => apiRequest('/payments');

export const postPayment = (paymentData) => apiRequest('/payments', {
    method: 'POST',
    body: JSON.stringify(paymentData),
});

export const getProfile = () => apiRequest('/users/me');

export const updateProfile = (profileData) => apiRequest('/users/me', {
    method: 'PUT',
    body: JSON.stringify(profileData),
});
