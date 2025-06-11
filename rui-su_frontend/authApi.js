import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Update if backend runs elsewhere

// Login user
export const login = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/api/token/`, {
        email,
        password,
    });
    return response.data; // { access, refresh }
};

// Register user
export const register = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/api/register/`, userData);
    return response.data;
};

// Refresh JWT token
export const refreshToken = async (refresh) => {
    const response = await axios.post(`${API_BASE_URL}/api/token/refresh/`, {
        refresh,
    });
    return response.data; // { access }
};

// Request password reset
export const requestPasswordReset = async (email) => {
    const response = await axios.post(`${API_BASE_URL}/api/password_reset/`, {
        email,
    });
    return response.data;
};

// Confirm password reset
export const confirmPasswordReset = async (uid, token, new_password) => {
    const response = await axios.post(`${API_BASE_URL}/api/password_reset/confirm/`, {
        uid,
        token,
        new_password,
    });
    return response.data;
};
