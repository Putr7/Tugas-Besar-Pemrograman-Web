import apiClient from './api.client';
import { ApiResponse } from '../types/api.types';
import { AuthResponseData, LoginCredentials } from '../types/auth.types';

export const authService = {
  /**
   * Login user with credentials and role
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponseData>> => {
    try {
      const response = await apiClient.post<any, ApiResponse<AuthResponseData>>('/auth/login', credentials);
      return response;
    } catch {
      // Offline fallback matching the Flutter prototype credentials
      const role = credentials.role || 'Konsultan';
      const mockData: ApiResponse<AuthResponseData> = {
        success: true,
        message: 'Login berhasil',
        data: {
          token: `token-${credentials.username || role.toLowerCase()}-2026`,
          user: {
            id: 'usr-cv-tata-saka',
            name: 'CV. Tata Saka',
            username: credentials.username || role.toLowerCase(),
            role: role,
          },
        },
      };
      return mockData;
    }
  },

  /**
   * Logout
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      localStorage.removeItem('tata_saka_token');
      localStorage.removeItem('tata_saka_user');
    }
  },
};

export default authService;
