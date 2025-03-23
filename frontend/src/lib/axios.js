import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.DEV ? import.meta.env.VITE_API_URL : '/api',
    withCredentials: true,
})

// Automatically extract `res.data` for all requests
axiosInstance.interceptors.response.use(
    (response) => response?.data, // Returns only `data` from API
    (error) => Promise.reject(error) // Handles errors normally
);