import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '../types/auth.types';

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: UserProfile) => void;
  logout: () => void;
  updateUserProfile: (newData: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: 'usr-demo-01',
        name: 'CV. Tata Saka',
        username: 'konsultan',
        role: 'Konsultan',
      },
      token: 'demo-token-cv-tata-saka',
      isAuthenticated: true, // Default authenticated to make exploration seamless
      isLoading: false,

      login: (token, userData) => {
        localStorage.setItem('tata_saka_token', token);
        localStorage.setItem('tata_saka_user', JSON.stringify(userData));
        set({
          token,
          user: userData,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        localStorage.removeItem('tata_saka_token');
        localStorage.removeItem('tata_saka_user');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateUserProfile: (newData) => {
        set((state) => {
          if (!state.user) return state;
          const updatedUser = { ...state.user, ...newData };
          localStorage.setItem('tata_saka_user', JSON.stringify(updatedUser));
          return { user: updatedUser };
        });
      },
    }),
    {
      name: 'tata-saka-auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
