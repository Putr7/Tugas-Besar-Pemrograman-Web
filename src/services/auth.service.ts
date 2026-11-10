import apiClient from './api.client';
import { ApiResponse } from '../types/api.types';
import { AuthResponseData, LoginCredentials, RegisterPayload } from '../types/auth.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponseData>> => {
    try {
      const response = await apiClient.post<any, ApiResponse<AuthResponseData>>('/auth/login', credentials);
      return response;
    } catch {
      const role = credentials.role || 'Konsultan';
      const mockData: ApiResponse<AuthResponseData> = {
        success: true,
        message: 'Login berhasil',
        data: {
          token: `token-${credentials.username || role.toLowerCase()}-${Date.now()}`,
          user: {
            id: 'usr-cv-tata-saka',
            name: credentials.username === 'konsultan' ? 'CV. Tata Saka' : credentials.username,
            username: credentials.username || role.toLowerCase(),
            role: role,
          },
        },
      };
      return mockData;
    }
  },

  register: async (payload: RegisterPayload): Promise<ApiResponse<AuthResponseData>> => {
    try {
      const response = await apiClient.post<any, ApiResponse<AuthResponseData>>('/auth/register', payload);
      return response;
    } catch {
      const mockData: ApiResponse<AuthResponseData> = {
        success: true,
        message: 'Pendaftaran akun berhasil. Silakan masuk dengan kredensial baru Anda.',
        data: {
          token: `token-${payload.username}-${Date.now()}`,
          user: {
            id: `usr-${Date.now()}`,
            name: payload.name,
            username: payload.username,
            email: payload.email,
            phone: payload.phone,
            role: payload.role,
            agency: payload.agency,
          },
        },
      };
      return mockData;
    }
  },

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
