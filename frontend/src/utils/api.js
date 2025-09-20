const API_BASE_URL = 'http://127.0.0.1:8000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
        ...getAuthHeaders(),
        ...options.headers,
    };

    // Don't set Content-Type for FormData - let browser set it automatically
    if (options.body instanceof FormData) {
        delete headers['Content-Type'];
    } else if (!options.headers || !options.headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

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

export const getUser = () => apiRequest('/users/me');

export const logout = () => apiRequest('/users/logout', { method: 'POST' });

export const forgotPassword = (email) => apiRequest('/users/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
});

export const resetPassword = (token, email, password, passwordConfirmation) => apiRequest('/users/reset-password', {
    method: 'POST',
    body: JSON.stringify({
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
    }),
});

export const getAdminDashboard = () => apiRequest('/admin/dashboard');

// Admin API functions
export const getAdminUsers = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/admin/users?${queryString}`);
};

export const blockUser = (userId) => apiRequest(`/admin/users/${userId}/block`, {
    method: 'PUT',
});

export const deleteUser = (userId) => apiRequest(`/admin/users/${userId}`, {
    method: 'DELETE',
});

export const getAdminJobs = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/admin/jobs?${queryString}`);
};

export const deleteJob = (jobId) => apiRequest(`/admin/jobs/${jobId}`, {
    method: 'DELETE',
});

export const getAdminStatistics = () => apiRequest('/admin/statistics');

export const getEmployersWithJobs = () => apiRequest('/admin/employers-with-jobs');

export const getActiveEmployers = () => apiRequest('/admin/active-employers');

// Recent activity API functions
export const getRecentUsers = () => apiRequest('/admin/recent-users');
export const getRecentJobs = () => apiRequest('/admin/recent-jobs');
export const getRecentApplications = () => apiRequest('/admin/recent-applications');

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

export const deleteJobByUser = (id) => apiRequest(`/jobs/${id}`, {
    method: 'DELETE',
});

export const getApplications = () => apiRequest('/applications');

export const postApplication = (applicationData) => apiRequest('/applications', {
    method: 'POST',
    body: applicationData, // This can be FormData or JSON
    headers: applicationData instanceof FormData ? {} : { 'Content-Type': 'application/json' }
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

// Employer Profile API functions
export const getEmployerProfile = () => apiRequest('/users/employer-profile');

export const updateEmployerProfile = (profileData) => apiRequest('/users/employer-profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
});
