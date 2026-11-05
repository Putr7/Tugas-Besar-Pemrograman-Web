import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../config/api.config';

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
});

// Request Interceptor: Inject Token & Dev Logging
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('tata_saka_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global Errors (401, 403, 500)
apiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.status} ${response.config.url}`, response.data);
    }
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Sesi telah habis atau token invalid
      localStorage.removeItem('tata_saka_token');
      localStorage.removeItem('tata_saka_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login?session_expired=true';
      }
    } else if (error.response?.status === 403) {
      console.error('Akses ditolak: Anda tidak memiliki izin untuk resource ini.');
    } else if (error.response?.status && error.response.status >= 500) {
      console.error('Terjadi kendala pada server, silakan hubungi tim IT.');
    } else if (!error.response) {
      console.error('Koneksi jaringan terputus atau server offline.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;

